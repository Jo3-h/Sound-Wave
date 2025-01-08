const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "your_default_secret"; // Use a secret from environment variables

// Generate a JWT
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, secret, { expiresIn });
};

// Verify a JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; // Return null if verification fails
  }
};

module.exports = { generateToken, verifyToken };
