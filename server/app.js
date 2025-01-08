/**
 * /app.js
 * This file contains the express app object.
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// define app object
const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define and mount routes
const userRoutes = require("./routes/users");
const spotifyRoutes = require("./routes/spotify");
app.use("/users", userRoutes);
app.use("/spotify", spotifyRoutes);

// export app object
module.exports = app;
