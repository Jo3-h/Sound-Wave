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
const express = require("express");
const router = express.Router();
const logRequest = require("../../logs/logRequest");
const SpotifyWebApi = require("spotify-web-api-node"); // Importing SpotifyWebApi

router.post("/login", (req, res) => {
  logRequest(req, "INFO", "Requesting Access Token");
  const code = req.body.code;
  const redirectUri = req.body.redirectUri;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
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

module.exports = router;
