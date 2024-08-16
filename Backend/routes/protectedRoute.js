const express = require("express");
const authenticateJWT = require("../middleware/middleAuth");
const pRouter = express.Router();
const Book = require("../models/booksModel");

// Example Protected Route
pRouter.get("/dashboard", authenticateJWT, (req, res) => {
  try {
    //console.log("User:", req.user);
    res.json({ message: `Welcome to the dashboard,  ${req.user.userName}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// protected route getting books
pRouter.get("/getBooks", authenticateJWT, async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    console.error("Error in getting books:", error);
    res.status(500).json({ error: "An error occurred while retrieving books" });
  }
});

module.exports = pRouter;
