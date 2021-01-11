const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const colors = require("colors");

const connectDB = require("./config/db");

require("dotenv").config({ path: "./config/config.env" });

//mount db
connectDB();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Require models
require("./models/Bootcamp");

// Route files
app.use(require("./routes"));

module.exports = app;
