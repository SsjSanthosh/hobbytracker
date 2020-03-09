const express = require("express");
const app = express();
const router = require("./routes/index");
const bookRouter = require("./routes/books");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const compression = require("compression");

// text compression
app.use(compression());
// body-parser
app.use(express.json({ extended: false }));

// connect to mongoDB
connectDB();
app.use("/", router);

// Books router
app.use("/hobbies/books", bookRouter);

// Auth router
app.use("/auth", authRouter);

module.exports = app;
