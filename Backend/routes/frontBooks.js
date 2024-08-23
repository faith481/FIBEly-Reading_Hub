const express = require("express");
const Book = require("../models/booksModel");
const fRouter = express.Router();
const Cart = require("../models/cartModel");
const mongoose = require("mongoose");
const authenticateJWT = require("../middleware/middleAuth");

fRouter.get("/books/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book); // The book object includes the base64 image string
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
});

module.exports = fRouter;
