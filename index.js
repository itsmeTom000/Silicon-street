const cookieParser = require("cookie-parser");
const express = require("express");
const server = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./config/mongoose_connection");
const { log } = require("console");
const userModel = require("./models/userModel");
const productModel = require("./models/productModel");

server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());

// Middleware to verify token and authenticate user
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("No token found, redirecting to login");
        return res.redirect("/");
    }

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            console.log("Invalid token, redirecting to login");
            return res.redirect("/");
        }
        req.user = decoded; // Store the decoded token data (email, userid) in req.user
        next(); // Proceed to the next middleware/route handler
    });
};

server.get("/", (req, res) => {
    res.render("index", { isMatch_: 0 });
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
        let isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            let token = jwt.sign({ email: user.email, userid: user._id }, "secret");
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

server.post("/login/user/product", async (req, res) => {
    try {
        let product = await productModel.create({
            Image: req.body.img,
            name: req.body.productName,
            detail_1: req.body.detail_1,
            detail_2: req.body.detail_2,
            detail_3: req.body.detail_3,
            detail_4: req.body.detail_4,
            detail_5: req.body.detail_5,
            price: req.body.price
        });
        console.log(product);
        res.redirect("/");
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