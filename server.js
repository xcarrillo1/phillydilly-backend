///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const {PORT = 4000, MONGODB_URL} = process.env;
//import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middleware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// establish connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// connection events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const PostSchema = new mongoose.Schema({
    title: {type: String, require: true},
    author: {type: String, require: true},
    image: {type: String, require: true},
    text: {type: String, require: true},
});

const Post = mongoose.model("Post", PostSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES - INDUCES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("Backend working!")
});

// POST INDEX ROUTE
app.get("/post", async (req, res) => {
    try {
        // send all posts
        res.json(await Post.find({}));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// POST CREATE ROUTE
app.post("/post", async (req, res) => {
    try {
        // send all posts
        res.json(await Post.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`Listening on ${PORT}`));