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

app.listen(3001);
