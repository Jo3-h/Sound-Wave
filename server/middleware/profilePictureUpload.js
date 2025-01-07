/**
 * server/middleware/profilePictureUpload.js
 */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../client/public/profile_pictures"));
  },
  filename: function (req, file, cb) {
    const username = req.body.username || "default-profile-pic";
    cb(null, `${username}.jpg`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
