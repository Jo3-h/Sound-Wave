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
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

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

// starting the application listening on port 3001
app.listen(3001);
