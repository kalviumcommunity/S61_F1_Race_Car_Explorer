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
const port = 3000;

App.listen(port, () => {
    console.log(`server is running on port ${port}`)
});