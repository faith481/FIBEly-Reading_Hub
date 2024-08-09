require("dotenv").config();
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;

// Import Redis and MongoDB connections
const redisClient = require("./utils/redis");
const mongoose = require("./utils/db");

const app = express();
app.use(express.json()); // For parsing application/json

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

// Example route
app.get("/", (req, res) => {
  res.send("FIBEly ReadingApp Backend");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
