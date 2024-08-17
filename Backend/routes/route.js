const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");
const protectedRoutes = require("./protectedRoute");

// User Authentication Routes
router.use("/auth", authRoutes);

// Protected Routes
router.use("/protected", protectedRoutes);
//router.use("/auth", authRoutes);

module.exports = router;
