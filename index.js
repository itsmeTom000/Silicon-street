const cookieParser = require("cookie-parser");
const express = require("express");
const server = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/mongoose_connection.js");
const { log } = require("console");
const userModel = require("./models/userModel.js");
const productModel = require("./models/productModel.js");
const upload = require("./config/multer.js");
const session = require('express-session');

server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

// server.use(session({
//     secret: 'yourSecretKey', // Replace with a strong secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }  // Set 'true' for HTTPS
// }));

server.get("/", (req, res) => {
    res.render("index", { isMatch_: 0});
})

server.post("/create", async (req, res) => {
    try {
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                let user = await userModel.create({
                    name: req.body.username,
                    email: req.body.email,
                    password: hash
                })
                let token = jwt.sign({ email: user.email, userid: user._id }, "secret")
                console.log("signup success");
                res.cookie("token", token);
                return res.redirect("/");
            })
        })
    }
    catch (err) {
        console.log(err.message);
    }
})

server.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
        }
        // req.session.login_user = user.name;
        let isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            let token = jwt.sign({ email: user.email, userid: user._id }, "secret");
            // req.session.login_email = user.email;

            res.cookie("token", token);
            console.log("Login success");

            res.render("index", { isMatch_: 1, name: user.name, email: user.email }); // Redirect on successful login
        } else {
            console.log("Invalid credentials");
        }
    } catch (err) {
        console.log(err.message);
    }
});

server.post("/product", upload.single('img'), async (req, res) => {
    try {
        await productModel.create({
            Image: req.file.buffer,
            name: req.body.productName,
            detail_1: req.body.detail_1,
            detail_2: req.body.detail_2,
            detail_3: req.body.detail_3,
            detail_4: req.body.detail_4,
            detail_5: req.body.detail_5,
            price: req.body.price
        });
        // console.log(product);
        // res.redirect("/");
        // res.json({ isMatch_: 1 });
        return res.render("index", { isMatch_: 1, name: null, email: null });
    } catch (err) {
        console.log(err.message);
    }
});


server.get("/logout", (req, res) => {
    // Clear the authentication cookie
    res.clearCookie("token");
    console.log("Logout success");
    res.render("index", { isMatch_: 0 });
});


server.get("/shop", async (req, res) => {
    let products = await productModel.find();
    res.render("shop", { products });
})

server.get("/pre-build", (req, res) => {
    res.render("pre-build");
})

server.listen(3000, () => {
    console.log("Server running on port 3000");
})