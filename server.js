const express = require("express");
const mongoose = require("mongoose");
const logging = require("logging");
const fs = require("fs");
const { raceRouter } = require("./Routes");
const port = process.env.PORT || 3000;
require("dotenv").config();

const App = express();

App.use(express.json());

// Create a logs directory if it doesn't exist
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Set up logging configuration
logging.basicConfig({
  filename: './logs/app.log',
  level: logging.ERROR,
  format: '%(asctime)s - %(levelname)s - %(message)s'
});

// Ping route
App.get("/ping", (req, res) => {
  res.send("pong");
});

// Register routes from Routes.js
App.use("/api", raceRouter);

// MongDB connection
mongoose.connect(process.env.DATABASE_URI)
  .then(() => logging.info('MongoDB connected'))
  .catch(err => {
    logging.error('MongoDB connection error:', err);
    process.exit(1);
  });

App.listen(port, () => {
  logging.info(`Server is running on port ${port}`);
});
