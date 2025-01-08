const express = require("express");
const router = express.Router();
const logRequest = require("../../logs/logRequest");
const checkDBConnection = require("../../middleware/checkDBConnection");
const { Album } = require("../../db");

router.get("/", checkDBConnection, async (req, res) => {
  const albumId = req.params.id;
  logRequest(req, "INFO", `Getting album with id: ${albumId}`);

  try {
    const album = await Album.findByPk(albumId);

    if (!album) {
      return res
        .status(404)
        .json({ error: `Album with ID ${albumId} not found` });
    }

    res.json({ album });
  } catch (error) {
    res.status(500).json({ error: "Error getting albums" });
    console.error("Error getting albums:", error);
  }
});

module.exports = router;
