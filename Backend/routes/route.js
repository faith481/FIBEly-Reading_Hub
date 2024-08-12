const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();

// Book model
class Book {
  constructor(
    bookID,
    title,
    author,
    genre,
    content,
    publishedDate,
    createdAt,
    updatedAt,
    coverImage = null,
    newPrice = null,
    oldPrice = null
  ) {
    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.content = content;
    this.publishedDate = publishedDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.coverImage = coverImage;
    this.newPrice = newPrice;
    this.oldPrice = oldPrice;
  }
}

// BookRouter class to manage books
class BookRouter {
  constructor() {
    this.books = [];
  }

  // Add a book
  addBook(book) {
    this.books.push(book);
    return book;
  }

  // View all books
  viewBooks() {
    return this.books;
  }

  // Search books by title or author
  searchBooks(query) {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Save books to a JSON file
  saveBooks() {
    const data = JSON.stringify(
      this.books.map((book) => ({
        bookID: book.bookID,
        title: book.title,
        author: book.author,
        genre: book.genre,
        content: book.content,
        publishedDate: book.publishedDate,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        coverImage: book.coverImage,
        newPrice: book.newPrice,
        oldPrice: book.oldPrice,
      }))
    );
    fs.writeFileSync('books.json', data);
  }

  // Load books from a JSON file
  loadBooks() {
    try {
      const data = fs.readFileSync('books.json', 'utf8');
      this.books = JSON.parse(data).map(
        (book) =>
          new Book(
            book.bookID,
            book.title,
            book.author,
            book.genre,
            book.content,
            book.publishedDate,
            book.createdAt,
            book.updatedAt,
            book.coverImage,
            book.newPrice,
            book.oldPrice
          )
      );
    } catch (err) {
      console.log("No saved books found.");
    }
  }
}

// Create a new BookRouter instance
const bookRouter = new BookRouter();

// Load books from file
bookRouter.loadBooks();

// Set up routes
router.use(express.json());

router.post('/books', (req, res) => {
  const book = new Book(
    req.body.bookID,
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.content,
    req.body.publishedDate,
    req.body.createdAt,
    req.body.updatedAt,
    req.body.coverImage,
    req.body.newPrice,
    req.body.oldPrice
  );
  const addedBook = bookRouter.addBook(book);
  res.send(`Book added successfully: ${addedBook.title} by ${addedBook.author}`);
});

router.get('/books', (req, res) => {
  res.json(bookRouter.viewBooks());
});

router.get('/books/search', (req, res) => {
  const query = req.query.query;
  res.json(bookRouter.searchBooks(query));
});

router.post('/books/save', (req, res) => {
  bookRouter.saveBooks();
  res.send("Books saved to file");
});

router.post('/books/load', (req, res) => {
  bookRouter.loadBooks();
  res.send("Books loaded from file");
});

// Use the router in the app
app.use('/api', router);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
