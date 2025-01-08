/**
 * spotifyApi.js
 * This file initializes and exports the spotifyApi instance.
 */

const SpotifyWebApi = require("spotify-web-api-node");

// Initialize Spotify API with client credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

module.exports = { spotifyApi };
