/**
 * /routes/spotify/index.js
 */
const express = require("express");
const router = express.Router();

// Import individual user routes
const loginRoute = require("./login");
const refreshRoute = require("./refresh");
const importRoute = require("./importCountdownPlaylist");
const statsRoute = require("./userStats");

// Mount user routes at /spotify
router.use("/login", loginRoute);
router.use("/refresh", refreshRoute);
router.use("/import-countdown-playlist", importRoute);
router.use("/user-stats", statsRoute);

// Catch-all handler for invalid Spotify routes
router.use((req, res) => {
  res.status(404).json({ error: "Spotify route not found" });
});

// Export the router
module.exports = router;
