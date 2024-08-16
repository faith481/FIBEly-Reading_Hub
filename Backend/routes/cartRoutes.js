const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authenticateJWT = require("../middleware/authenticateJWT");

// Add book to cart
router.post("/cart/add", authenticateJWT, async (req, res) => {
  try {
    const { bookId } = req.body;

    // Find the cart for the user
    let cart = await Cart.findOne({ user: req.user._id });
    
    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ user: req.user._id, books: [bookId] });
    } else {
      // Add book to existing cart
      cart.books.push(bookId);
    }

    await cart.save();
    res.json({ message: "Book added to cart", cart });
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
