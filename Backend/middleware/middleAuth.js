//require("dotenv").config();
const jwt = require("jsonwebtoken");
const redisClient = require("../utils/redis");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token); // Debugging

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err); // Debugging
        return res.sendStatus(403); // Forbidden
      }

      console.log("Decoded User:", user); // Debugging
      req.user = user; // Attach the decoded user info to the request object
      next();
    });
  } else {
    console.log("No Authorization Header"); // Debugging
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
