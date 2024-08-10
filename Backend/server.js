require("dotenv").config();
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("./utils/redis");
const mongoose = require("./utils/db");
const authenticateJWT = require("./middleware/middleAuth");
const userAuth = require("./userAuth/authUser");

const app = express();
app.use(express.json());

// Session middleware using Redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure to true in production
  })
);

// User Authentication Routes
app.use("/auth", userAuth);

// Example Protected Route
app.get("/dashboard", authenticateJWT, (req, res) => {
  try {
    res.json({ message: `Welcome to the dashboard, ${req.user.userId}` });
  } catch (error) {
    // Handle the error or perform any necessary actions
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
  //try{
  //res.json({ message: `Welcome to the dashboard, ${req.user.userId}` });
 // }catch(error)
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//module.exports = app;
