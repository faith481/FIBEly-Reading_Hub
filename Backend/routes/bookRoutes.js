const express = require("express");
const bRouter = express.Router();
const Book = require("../models/booksModel");
const requireRole = require("../middleware/middleRole");

// Upload a new book
bRouter.post("/upload", requireRole("publisher"), async (req, res) => {
  try {
    const { title, author, genre, publicationDate, publisher } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      publisher,
    });
    await newBook.save();
    res
      .status(201)
      .json({ message: "Book uploaded successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error uploading book", error });
  }
});

// Update a book
bRouter.put("/update/:id", requireRole("publisher"), async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Delete a book
bRouter.delete("/delete/:id", requireRole("publisher"), async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

// function to get books by title
bRouter.get("/:title", async (req, res) => {
  try {
    const decoded_title = decodeURIComponent(req.params.title);
    console.log("Decoded Title:", decoded_title);
    const book = await Book.findOne({ title: decoded_title });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch book by title" });
  }
});

//function to delete books by
bRouter.delete(
  "/deltitle/:title",
  requireRole("publisher"),
  async (req, res) => {
    try {
      const decoded_title = decodeURIComponent(req.params.title);
      console.log("Decoded Title:", decoded_title);
      const deletedBook = await Book.findOneAndDelete({ title: decoded_title });
      if (!deletedBook)
        return res.status(404).json({ message: "Book not found" });
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Error deleting book", error });
    }
  }
);

module.exports = bRouter;
