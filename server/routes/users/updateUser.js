const express = require("express");
const router = express.Router();
const { User } = require("../../db");
const logRequest = require("../../logs/logRequest");
const {
  checkDBConnection,
  setDBConnectionStatus,
} = require("../../middleware/checkDBConnection");
const { upload } = require("../../middleware/profilePictureUpload");

router.post(
  "/api/update-user",
  checkDBConnection,
  upload.single("profile_image"),
  async (req, res) => {
    logRequest(req, "INFO", "Updating user details");

    const { id, firstName, lastName, username, email, password, password2 } =
      req.body;
    if (!id) {
      return res.status(400).json({ error: "Missing form data" });
    }

    try {
      // check that user exists in database
      const user = await User.findOne({ where: { id: id } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // update user details
      user.username = username;
      user.first_name = firstName;
      user.last_name = lastName;

      // save new profile picture
      if (req.file) {
        user.profile_pic = req.file.path;
      }

      // save changes to database
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error updating user details" });
      console.error("Error updating user details:", error);
    }
  }
);

module.exports = router;
