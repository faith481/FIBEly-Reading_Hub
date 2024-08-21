const express = require("express");
const User = require("../models/userModel");
const cRouter = express.Router();
const Cart = require("../models/cartModel");
const mongoose = require('mongoose');
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

cRouter.post("/remove", authenticateJWT, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.userId;

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, return an error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the book from the cart
    cart.books = cart.books.filter(id => id.toString() !== bookId);

    // Save the updated cart
    await cart.save();

    res.json({ message: "Book removed from cart", cart });
  } catch (error) {
    console.error("Error removing book from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = cRouter;
