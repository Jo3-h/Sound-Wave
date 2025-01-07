const express = require("express");
const router = express.Router();
const logRequest = require("../../logs/logRequest");
const {
  checkDBConnection,
  setDBConnectionStatus,
} = require("../../middleware/checkDBConnection");

router.post("/api/signup", checkDBConnection, async (req, res) => {
  logRequest(req, "INFO", "Creating new user");
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
    console.error("Error creating user:", error);
  }
});

module.exports = router;
