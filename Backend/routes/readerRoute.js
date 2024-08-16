const express = require("express");
const rRouter = express.Router();
const Book = require("../models/booksModel");
const requireRole = require("../middleware/middleRole");

// Add a book to the user's cart
rRouter.post("/cart", async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = await User.findById(req.user._id);
    user.cart.push(bookId);
    await user.save();
    res.status(200).json({ message: "Book added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding book to cart", error });
  }
});

// View user's cart
rRouter.get("/cart", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart", error });
  }
});

module.exports = rRouter;
