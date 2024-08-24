const express = require("express");
const lRouter = express.Router();
const Book = require("../models/booksModel");
const requireRole = require("../middleware/middleRole");
const upload = require("../middleware/multer");
const fs = require("fs");

lRouter.get("/latest", async (req, res) => {
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const latestBooks = await Book.find({
      createdAt: { $gte: threeDaysAgo },
    })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(latestBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching latest books" });
  }
});

module.exports = lRouter;
