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
const express = require("express");
const router = express.Router();
const logRequest = require("../../logs/logRequest");
const { spotifyApi } = require("./../utils/spotifyWebApi");

router.post("/", (req, res) => {
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

module.exports = router;
