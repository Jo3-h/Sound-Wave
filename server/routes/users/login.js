const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../db");
const logRequest = require("../../logs/logRequest");
const checkDBConnection = require("../../middleware/checkDBConnection");
const { generateToken, verifyToken } = require("../utils/jwt");

router.post("/", checkDBConnection, async (req, res) => {
  logRequest(req, "INFO", "Logging in user");
  const { username, password } = req.body;
  try {
    // check that user exists in database
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check that password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ error: "Invalid password" });
    }

    // create JWT token
    const token = generateToken({ user_id: user.id, username: user.username });
    return res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        username: user.username,
        profile_pic: user.profile_pic,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Error logging in user" });
    }
  }
});

module.exports = router;
