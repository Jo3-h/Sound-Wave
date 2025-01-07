/**
 * /server/middleware/checkDBConnection.js
 *
 */
let db_connection = false;

// Middleware to check database connection
const checkDBConnection = (req, res, next) => {
  if (!db_connection) {
    return res.status(500).json({ error: "Database connection error" });
  }
  next();
};

module.exports = {
  checkDBConnection,
  setDBConnectionStatus: (status) => (db_connection = status),
};
