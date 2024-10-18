const cookieParser = require("cookie-parser");
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const path = require("path");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/mongoose_connection");


server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

server.get("/", (req, res) => {
    res.render("index");
})

server.post("/", async (req, res) => {
    let user_2 = await userModel.findOne({ email: req.body.email });
    if (user_2) return res.status(400).send("User already exists");
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            let user = await userModel.create({
                name: req.body.username,
                email: req.body.email,
                password: hash
            })
            let token = jwt.sign({ email: user.email, userid: user._id }, "secret")
            res.cookie("token", token);
            return res.redirect("/");
        })
    })
})

server.get("/shop", (req, res) => {
    res.render("shop");
})

server.get("/pre-build", (req, res) => {
    res.render("pre-build");
})

server.listen(3000, () => {
    console.log("Server running on port 3000");
})