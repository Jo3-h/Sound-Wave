const express = require("express");
const router = express.Router();
const logRequest = require("../../logs/logRequest");
const checkDBConnection = require("../../middleware/checkDBConnection");
const { Album } = require("../../db");

router.get("/", checkDBConnection, async (req, res) => {
  logRequest(req, "INFO", "Getting all albums");

  try {
    const albums = await Album.findAll();

    if (!albums) {
      return res.status(404).json({ error: "No albums found" });
    }

    res.json({ albums });
  } catch (error) {
    res.status(500).json({ error: "Error getting albums" });
    console.error("Error getting albums:", error);
  }
});

module.exports = router;
