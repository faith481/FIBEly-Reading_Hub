const express = require("express");
const Book = require("../models/booksModel");
const cRouter = express.Router();
const Cart = require("../models/cartModel");
const mongoose = require("mongoose");
const authenticateJWT = require("../middleware/middleAuth");

// Add book to cart
cRouter.post("/add", authenticateJWT, async (req, res) => {
  try {
    const { bookId } = req.body;
    // Convert bookId to ObjectId for comparison
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    const book = await Book.findOne({ _id: bookObjectId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ user: req.user.userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        books: [
          {
            _id: book._id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            publicationDate: book.publicationDate,
            image: book.image,
          },
        ],
      });
    } else {
      // Check if book already exists in the cart
      if (!cart.books.some((book) => book._id.equals(bookObjectId))) {
        cart.books.push({
          _id: book._id,
          title: book.title,
          author: book.author,
          genre: book.genre,
          publicationDate: book.publicationDate,
          image: book.image,
        });
      } else {
        return res.status(400).json({ message: "Book already in cart" });
      }
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

    // Convert bookId to ObjectId
    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, return an error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Log the current state of the cart
    //console.log("Cart Before Removal:", cart.books);

    // Remove the book from the cart
    const initialBooksLength = cart.books.length;
    cart.books = cart.books.filter((id) => !id.equals(bookObjectId));

    // Log the updated state of the cart
    //console.log("Cart After Removal:", cart.books);

    // Check if the book was actually removed
    if (cart.books.length === initialBooksLength) {
      console.log("No book was removed from the cart.");
      return res.status(400).json({ message: "Book not found in cart" });
    }

    // Save the updated cart
    const updatedCart = await cart.save();

    res.json({ message: "Book removed from cart", cart: updatedCart });
  } catch (error) {
    console.error("Error removing book from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cRouter.post("/clearCart", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, return an error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear all books from the cart
    cart.books = [];

    // Save the updated cart
    await cart.save();

    res.json({ message: "All books removed from cart", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cRouter.get("/getCart", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists, return an empty cart
    if (!cart) {
      cart = { books: [] };
    }

    res.json({ message: "Cart retrieved", cart });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = cRouter;
