/**
 * GET /user-stats
 *
 * Request Body:
 * {
 *  "accessToken": <string>
 * }
 */
const express = require("express");
const router = express.Router();
const { spotifyApi } = require("../spotifyWebApi");
const logRequest = require("../../logs/logRequest");

router.get("/user-stats", (req, res) => {
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

module.exports = router;
