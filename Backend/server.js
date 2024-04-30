const express = require("express");
const mongoose = require("mongoose");
const { raceRouter } = require("./Routes");
const port = process.env.PORT || 3000;
require("dotenv").config();

const App = express();

App.use(express.json());

// Ping route
App.get("/ping", (req, res) => {
  res.send("pong");
});

// Register routes from Routes.js
App.use("/api", raceRouter);

// MongDB connection
mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
