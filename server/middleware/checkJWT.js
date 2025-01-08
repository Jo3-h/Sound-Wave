const { generateToken, verifyToken } = require("../routes/utils/jwt");

const checkJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expected format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Token missing or unauthorized" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = decoded; // Attach decoded payload to `req.user`
  next();
};

module.exports = checkJWT;
