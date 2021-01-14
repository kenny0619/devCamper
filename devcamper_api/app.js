const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");

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
require("./models/Course");

// Route files
app.use(require("./routes"));

// mount middleware functions
app.use(require("./middleware/error"));

//use file upload middleware
app.use(fileupload);

module.exports = app;
