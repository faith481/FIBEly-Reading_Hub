const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    publisher: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

bookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
