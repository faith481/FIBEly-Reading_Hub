const express = require("express");
const cRouter = express.Router();
const Cart = require("../models/cartModel");
const authenticateJWT = require("../middleware/middleAuth");

// Add book to cart
cRouter.post("/add", authenticateJWT, async (req, res) => {
  try {
    const { bookId } = req.body;
    //const userId = req.user.userId;

    // Find the cart for the user
    let cart = await Cart.findOne({ user: req.user.userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ user: req.user.userId, books: [bookId] });
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

module.exports = cRouter;
