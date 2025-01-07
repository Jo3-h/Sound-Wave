/**
 * /routes/users/index.js
 */
const express = require("express");
const router = express.Router();

// Import individual user routes
const checkUsernameRoute = require("./checkUsername");
const signupRoute = require("./signup");
const loginRoute = require("./login");
const updateRoute = require("./updateUser");

// Mount user routes at /users
router.use("/check-username", checkUsernameRoute);
router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/update-user", updateRoute);

// Catch-all handler for invalid User routes
router.use((req, res) => {
  res.status(404).json({ error: "User route not found" });
});

// Export the router
module.exports = router;
