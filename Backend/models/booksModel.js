const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
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
    required: false, // Optional field
  },

  image: {
    type: String,
    required: true,
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
{
  timestamps: true;
}
bookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
