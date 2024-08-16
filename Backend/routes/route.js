const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/middleAuth");
const authRoutes = require("./authRoute");
const protectedRoutes = require("./protectedRoute");
const adminRoutes = require("./adminRoute");
const bookRoutes = require("./bookRoutes");
const readerRoutes = require("./readerRoute");
const cartRoutes = require("./cartRoutes");

// User Authentication Routes
router.use("/auth", authRoutes);

// Protected Routes
router.use("/protected", protectedRoutes);
//router.use("/auth", authRoutes);

// Book Routes (accessible by publishers and readers)
router.use("/books", authenticateJWT, bookRoutes);

// Admin Routes
router.use("/admin", authenticateJWT, adminRoutes);

// route for normal users
router.use("/", readerRoutes);

//routes for adding carts
router.use("/cart", cartRoutes);

module.exports = router;
