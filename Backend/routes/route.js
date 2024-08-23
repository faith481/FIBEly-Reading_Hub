const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/middleAuth");
const authRoutes = require("./authRoute");
const protectedRoutes = require("./protectedRoute");
const adminRoutes = require("./adminRoute");
const bookRoutes = require("./bookRoutes");
const readerRoutes = require("./readerRoute");
const cartRoutes = require("./cartRoutes");
const paymentRoutes = require("./payment_route");
const frontBooks = require("./frontBooks");
// User Authentication Routes
router.use("/auth", authRoutes);

// Protected Routes
router.use("/protected", protectedRoutes);
//router.use("/auth", authRoutes);

// Book Routes (accessible by publishers and readers)
router.use("/books", authenticateJWT, bookRoutes);

// Pament Routes
router.use("/payment", authenticateJWT, paymentRoutes);

// Admin Routes
router.use("/admin", authenticateJWT, adminRoutes);

// route for normal users
router.use("/", readerRoutes);

//routes for adding carts
router.use("/cart", cartRoutes);

//to fetch images for the fronted
router.use("/front", frontBooks);

module.exports = router;
