const express = require("express");
const mongoose = require("mongoose");
const { raceRouter } = require("./Routes");
const { userRouter } = require("./user.route");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/database");

const port = process.env.PORT || 3000;
const App = express();

App.use(cors());
App.use(express.json());
App.use(cookieParser());

// Ping route
App.get("/ping", (req, res) => {
  res.send("pong");
});

// Register routes from Routes.js
App.use('/api', userRouter)
App.use("/api", raceRouter);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

App.listen(port, async () => {
try {
  await connectDB();
  console.log('connected to DB')
} catch (error) {
  console.log(error)
}
  console.log(`Server is running on port ${port}`);
});
