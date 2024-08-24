const express = require("express");
const bRouter = express.Router();
const Book = require("../models/booksModel");
const requireRole = require("../middleware/middleRole");
const upload = require("../middleware/multer");
const fs = require("fs");

//const upload = multer({ dest: "./uploads/" });

// Upload a new book
bRouter.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        author,
        genre,
        publicationDate,
        publisher,
        newPrice,
        oldPrice,
      } = req.body;
      const imageF = req.files.image[0];
      const pdfFileF = req.files.pdfFile[0];

      const newBook = new Book({
        title,
        author,
        genre,
        publicationDate,
        publisher,
        image: imageF.path, // Store relative path to the image
        pdfFile: pdfFileF.path, // Store relative path to the PDF file
        pdfFileName: pdfFileF.originalname, // Store the original file name
        newPrice: parseFloat(newPrice), // Store new price as a number
        oldPrice: parseFloat(oldPrice), // Store old price as a number
      });

      await newBook.save();
      res
        .status(201)
        .json({ message: "Book uploaded successfully", book: newBook });
    } catch (error) {
      console.error("Error uploading book:", error);
      res.status(500).json({ message: "Error uploading book", error });
    }
  }
);
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

//function to delete books by title
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

bRouter.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.sendFile(filePath);
});

module.exports = bRouter;
