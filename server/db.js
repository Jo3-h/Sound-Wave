// server/db.js
const { Sequelize } = require("sequelize");
const config =
  require("./config/db_config")[process.env.NODE_ENV || "development"];
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(config);
const db = { sequelize, Sequelize };

fs.readdirSync(path.join(__dirname, "models"))
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, "models", file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
