/*
SoundWave Web Application - Backend Server
-------------------------------------------
This server handles the backend logic for the SoundWave application including, 
user authentication through spotify APIs, playlist management, manipulation of
playback state, streaming spotify content, and more.

Modules used:
- Dotenv: For management of environment variables
- Express: Framework for setting up web server
- Cors: Handle cross-origin requests
- Body-parser: Parse incoming data requests
- Spotify-web-api-node: For interaction with external spotify API

Endpoints:
- POST /login         - to login to the application with spotify credentials
- POST /refresh       - to refresh the users accessToken upon timeout

Author: Joe Hosking
Date: 15-10-2024

Usage:
- Development: npm run devStart (custom script to run with nodemon)
- Production: npm start

*/
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Spotify API with client credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

/*
Logging function to display to server terminal for debugging purposes
*/
const logRequest = (req, level = "INFO", message = "") => {
  const logMessage = `[${new Date().toISOString()}] [${level}] [${
    req.method
  }] [${req.originalUrl}] 
    [RequestID: ${req.id || "N/A"}]
    - Client IP: ${req.ip}
    - User Agent: ${req.headers["user-agent"]}
    - Request Params: ${JSON.stringify(req.query, null, 2)}
    - Request Body: ${JSON.stringify(req.body, null, 2)}
    Message: ${message || "Request processed successfully"}
  `;

  if (level === "ERROR") {
    console.error(logMessage);
  } else if (level === "WARN") {
    console.warn(logMessage);
  } else {
    console.info(logMessage);
  }
};

/*
POST /refresh 
-------------
This endpoint is responsible for refreshing the users accessToken either once it has
expired or the refresh interval in the frontend has timed out

Request Body:
{
  "refreshToken" : <string>     // the refreshToken provided by Spotify API upon initial login
}

Response Body:
on success -> {
  "accessToken" : <string>      // new accessToken
  "expiresIn" : <int>           // time until new token expires
}.status(200)

on failure -> {
  "error" : <string>            // details of the error returned from Spotify API
}.status(400)
*/
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("Access Token has been refreshed");
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400).json({ error: err });
    });
});

/*
POST /login 
-------------
This endpoint is responsible for taking a user login code obtained in the application frontend
and connecting to the external Spotify API to request an accessToken for API access.

Request Body:
{
  "code" : <string>             // code generated from user login through spotify portal
}

Response Body:
on success -> {
  "accessToken" : <string>      // accessToken used for accessing external Spotify API
  "refreshToken" : <string>     // refreshToken for obtaining new token once access token expires
  "expiresIn" : <int>           // time in seconds before accessToken expires
}.status(200)

on failure -> {
  "error" : <string>            // message confirming authorization failed
  "details" : <string>          // details of error returned from API call
}.status(400)
*/
app.post("/login", (req, res) => {
  const code = req.body.code;
  console.log("Received code:", code);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log("Spotify API connection success: ", data.body);
      res
        .json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
        .status(200);
    })
    .catch((err) => {
      console.log("Error connecting to Spotify API: ", err);
      res.status(400).json({ error: "authorization failed", details: err });
    });
});

/**
 * GET /import-countdown-playlist
 *
 */
app.get("/import-countdown-playlist", async (req, res) => {
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

/**
 * GET /user-stats
 *
 * Request Body:
 * {
 *  "accessToken": <string>
 * }
 */
app.get("/user-stats", (req, res) => {
  const accessToken = req.query.accessToken;
  spotifyApi.setAccessToken(accessToken);

  const tracks_result = [];
  const artists_result = [];
  const term_length = ["short_term", "medium_term", "long_term"];

  const trackPromises = term_length.map((term) => {
    return spotifyApi
      .getMyTopTracks({ time_range: term, limit: 50 })
      .then((data) => {
        tracks_result.push({ term, topTracks: data.body.items });
      })
      .catch((error) => {
        console.error("Error obtaining user top tracks:", error);
        return { term, error: "Error obtaining user's top songs." };
      });
  });

  const artistPromises = term_length.map((term) => {
    return spotifyApi
      .getMyTopArtists({ time_range: term, limit: 50 })
      .then((data) => {
        artists_result.push({ term, topArtists: data.body.items });
      })
      .catch((error) => {
        console.error("Error obtaining top artists:", error);
        return { term, error: "Error obtaining user's top artists." };
      });
  });

  Promise.all([...trackPromises, ...artistPromises])
    .then(() => {
      res.json({ tracks: tracks_result, artists: artists_result });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred while fetching user stats.",
        error,
      });
    });
});

// starting the application listening on port 3001
app.listen(3001);
