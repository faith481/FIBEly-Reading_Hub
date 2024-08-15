const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const requireRole = require("../middleware/requireRole");

// Upload a new book
router.post("/upload", requireRole("publisher"), async (req, res) => {
  try {
    const { title, author, genre, publisher } = req.body;
    const newBook = new Book({ title, author, genre, publisher: req.user._id });
    await newBook.save();
    res.status(201).json({ message: "Book uploaded successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error uploading book", error });
  }
});

// Update a book
router.put("/update/:id", requireRole("publisher"), async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Delete a book
router.delete("/delete/:id", requireRole("publisher"), async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

module.exports = router;
