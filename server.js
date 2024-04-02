require("dotenv").config();

const express = require("express");

const App = express();

App.use(express.json())
App.get("/", (req, res) => {
    res.send("hello")
});
App.get("/ping", (req, res) => {
    res.send("pong")
});

App.use((err, req, res, next) => {
    console.error("An error occurred", err)
    res.status(500).json({error: "Something went wrong.."})
})
const port = process.env.PORT || 3001;

App.listen(port, () => {
    console.log(`server is running on port ${port}`)
});