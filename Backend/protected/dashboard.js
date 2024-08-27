const express = require("express");
const authenticateJWT = require("../middleware/middleAuth");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("../utils/redis");
const mongoose = require("../utils/db");

class ProtectedRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/dashboard", authenticateJWT, this.dashboard);
  }

  dashboard(req, res) {
    try {
      res.json({ message: `Welcome to the dashboard, ${req.user.userId}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  }
}

module.exports = new ProtectedRoutes().router;
