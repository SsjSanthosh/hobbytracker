const express = require("express");
const app = express();
const router = require("./routes/index");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
// body-parser
app.use(express.json({ extended: false }));

// connect to mongoDB
connectDB();
app.use("/", router);
module.exports = app;
