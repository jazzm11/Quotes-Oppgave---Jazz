// Package imports
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

// Router imports
const defaultRouter = require("./router/defaultRouter");
const userRouter = require("./router/userRouter");

// App Setup
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// DB Connection
const connectDB = require("./config/db");
connectDB(process.env.MONGO_URI);

// Routes
app.use(defaultRouter);
app.use(userRouter);

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
