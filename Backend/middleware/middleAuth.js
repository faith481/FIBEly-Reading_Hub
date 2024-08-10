const jwt = require("jsonwebtoken");
const redisClient = require("../utils/redis");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    redisClient.get(token, (err, data) => {
      if (err) throw err;

      if (data === "logged_out") {
        return res.sendStatus(403); // Token is invalidated (logged out)
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};
module.exports = authenticateJWT;
