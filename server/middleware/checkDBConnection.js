const sequelize = require("./../db/sequelize");

const checkDBConnection = async (req, res, next) => {
  try {
    await sequelize.authenticate(); // Check the actual database connection
    console.log("Database connection is healthy.");
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);
    res.status(500).json({ error: "Database connection error" });
  }
};

module.exports = checkDBConnection;
