require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const App = express();

// MongoDB connection
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

App.use(express.json());

// Home route
App.get("/", (req, res) => {
  // Check MongoDB connection status
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.send(`Hello! MongoDB connection status: ${dbStatus}`);
});

App.get("/ping", (req, res) => {
  res.send("pong");
});

App.use((err, req, res, next) => {
  console.error("An error occurred", err);
  res.status(500).json({ error: "Something went wrong.." });
});

const port = process.env.PORT || 3000;

App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
