const { Sequelize } = require("sequelize");
const config = require("./../config/db_config"); // Adjust path as needed

// Determine environment
const env = process.env.NODE_ENV || "development";

// Get the appropriate configuration based on the environment
const dbConfig = config[env];

// Initialize Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging || console.log, // Disable logging in production if not specified
  }
);

module.exports = sequelize;
