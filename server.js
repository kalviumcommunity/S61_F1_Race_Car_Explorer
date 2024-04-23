const express = require("express");
const mongoose = require("mongoose");
const { raceRouter} = require("./Routes"); // Import routes from Routes.js
const port = process.env.PORT || 3000;
require("dotenv").config();

const App = express();

App.use(express.json());


// Home route
// App.get("/", (req, res) => {
//   // Check MongoDB connection status
//   const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
//   res.send(`Hello! MongoDB connection status: ${dbStatus}`);
// });

// Ping route
App.get("/ping", (req, res) => {
  res.send("pong");
});

// Register routes from Routes.js
App.use("/api", raceRouter);

// MongDB connection
mongoose.connect(process.env.DATABASE_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => {
//   console.error('MongoDB connection error:', err);
//   process.exit(1); 
// });



// Error handling middleware
// App.use((err, req, res, next) => {
//   console.error("An error occurred", err);
//   res.status(500).json({ error: err.message || "Something went wrong.." });
// });



App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
