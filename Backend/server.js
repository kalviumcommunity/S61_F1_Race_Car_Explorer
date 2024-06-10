const express = require("express");
const mongoose = require("mongoose");
const { raceRouter } = require("./Routes");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Joi = require('joi');
const connectDB = require("./config/database");
require("dotenv").config();

const port = process.env.PORT || 3000;
const App = express();

App.use(cors());
App.use(express.json());
App.use(cookieParser());

// Joi schema for validating login data
const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
});

// Ping route
App.get("/ping", (req, res) => {
  res.send("pong");
});

// Register routes from Routes.js
App.use("/api", raceRouter);

// MongoDB connection
// mongoose.connect(process.env.DATABASE_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

App.listen(port, async() => {
  await connectDB()
  console.log(`Server is running on port ${port}`);
});
