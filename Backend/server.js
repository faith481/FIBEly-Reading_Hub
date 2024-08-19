require("dotenv").config();
const express = require("express");
const session = require("express-session");
//const RedisStore = require("connect-redis").default;
//const redisClient = require("./utils/redis");
const mongoose = require("./utils/db");
//const authenticateJWT = require("./middleware/middleAuth");
const route = require("./routes/route");
//const user = require("./models/userModel");

const app = express();
app.use(express.json());
// Session middleware using Redis
app.use(
  session({
    //store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // false because we are in development
  })
);

app.use("/", route);

//app.use(route);

// Protected Route to be user for JWT authentication
//app.get("/dashboard", authenticateJWT, (req, res) => {
//  try {
//    res.json({ message: `Welcome to the dashboard, ${req.user.userId}` });
//  } catch (error) {
//    console.error(error);
//   res.status(500).json({ error: "An error occurred" });
// }
//});

const PORT = process.env.PORT || 5000;
const IP_ADDRESS = process.env.NODE_IP_ADDRESS || '127.0.0.1';
app.listen(PORT,IP_ADDRESS, () => console.log(`Server is running on port ${PORT} and the IP address is ${IP_ADDRESS}`));
