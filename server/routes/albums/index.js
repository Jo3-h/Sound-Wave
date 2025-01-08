/**
 * /routes/albums/index.js
 */
const express = require("express");
const router = express.Router();
const logRequest = require("../../logs/logRequest");

// Import individual user routes
const getAlbumRoute = require("./getAlbum");
const getAlbumsRoute = require("./getAlbums");

// Mount user routes at /spotify
router.use("/get-album/:id", getAlbumRoute);
router.use("/get-albums", getAlbumsRoute);

// Catch-all handler for invalid Spotify routes
router.use((req, res) => {
  logRequest(req, "ERROR", "Spotify route not found");
  res.status(404).json({ error: "Spotify route not found" });
});

// Export the router
module.exports = router;
