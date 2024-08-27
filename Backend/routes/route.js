const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/middleAuth");
const authRoutes = require("./authRoute");
const protectedRoutes = require("./protectedRoute");
const adminRoutes = require("./adminRoute");
const booksRoutes = require("./booksRoutes");
const readerRoutes = require("./readerRoute");
const cartRoutes = require("./cartRoutes");
const paymentRoutes = require("./payment_route");
const frontBooks = require("./frontBooks");
const latestRoute = require("./latestRoute");
const roleRoute = require("./admRoute");
// User Authentication Routes
router.use("/auth", authRoutes);

// Protected Routes
router.use("/protected", protectedRoutes);
//router.use("/auth", authRoutes);

// Book Routes (accessible by publishers and readers)
router.use("/books", authenticateJWT, booksRoutes);

// Payment Routes
router.use("/payment", authenticateJWT, paymentRoutes);

// Admin Routes
router.use("/admin", authenticateJWT, adminRoutes);

//routes for latest books

// route for normal users
router.use("/", readerRoutes);

//routes for adding carts
router.use("/cart", cartRoutes);

//to fetch images for the fronted
router.use("/front", frontBooks);

//route for the latest books
router.use("/new", latestRoute);

// check user role
router.use("/role", roleRoute);

module.exports = router;
