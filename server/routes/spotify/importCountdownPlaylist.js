/**
 * GET /import-countdown-playlist
 *
 */
const express = require("express");
const router = express.Router();
const { spotifyApi } = require("../utils/spotifyWebApi");
const { logRequest } = require("../../logs/logRequest");

router.get("/", async (req, res) => {
  // Add `async` here
  logRequest(req, "INFO", "Importing Playlist to Countdown");
  const playlistId = req.query.playlistId;
  const accessToken = req.query.accessToken;
  spotifyApi.setAccessToken(accessToken);

  const playlist_tracks = [];

  // get playlist details
  try {
    const playlistRes = await spotifyApi.getPlaylistTracks(playlistId);
    playlist_tracks.push(...playlistRes.body.items);
  } catch (error) {
    console.log("Error fetching playlist tracks -> ", error);
    res.status(500).json({ error: "Failed to fetch playlist tracks" });
    return;
  }

  async function getUserProfileImage(user_id) {
    try {
      const userRes = await spotifyApi.getUser(user_id);
      const displayName = userRes.body.display_name;
      return [userRes.body.images[0]?.url || "", displayName];
    } catch (error) {
      console.log("Error fetching user profile image -> ", error);
      return ["", ""];
    }
  }

  async function buildPlayersList(tracks) {
    const playersList = {};

    for (const item of tracks) {
      const userId = item.added_by.id;
      if (!playersList[userId]) {
        const profile_details = await getUserProfileImage(userId);
        const profileImage = profile_details[0];
        const displayName = profile_details[1];
        playersList[userId] = {
          id: userId,
          name: displayName,
          profileImage,
          selectedSongs: [],
        };
      }

      const track = item.track;
      playersList[userId].selectedSongs.push({
        artist: track.artists.map((artist) => artist.name).join(", "),
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[0]?.url || "",
        albumUrlLarge: track.album.images[1]?.url || "",
        played: false,
      });
    }

    return Object.values(playersList);
  }

  const playersList = await buildPlayersList(playlist_tracks);

  res.status(200).json({ players: playersList });
});

module.exports = router;
