const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// POST route to create a new review
router.post('/reviews', async (req, res) => {
    try {
        const { userID, bookID, rating, reviewText } = req.body;

        // Create a new review
        const newReview = new Review({
            userID: userID, // Reference to the user
            bookID: bookID, // Reference to the book
            rating: rating,
            reviewText: reviewText,
        });

        // Save the review to the database
        await newReview.save();

        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review' });
    }
});

module.exports = router;
