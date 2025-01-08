/**
 * POST /check-username
 *
 * Request Body:
 * {
 * "username": <string>
 * }
 */
const express = require("express");
const router = express.Router();
const { User } = require("../../db");
const checkDBConnection = require("../../middleware/checkDBConnection");
const logRequest = require("../../logs/logRequest");

router.post("/", checkDBConnection, async (req, res) => {
  logRequest(req, "INFO", "Checking username availability");
  const username = req.body.username;

  try {
    const user = await User.findOne({ where: { username: username } });
    console.log("User found: ", user);
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking username availability" });
    console.error("Error checking username availability:", error);
  }
});

module.exports = router;
