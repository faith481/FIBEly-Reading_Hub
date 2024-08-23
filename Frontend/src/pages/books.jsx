import React, { useState } from "react";
import axios from "axios";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    publisher: "",
  });
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch all books
  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (err) {
      setError("Failed to fetch books");
    }
  };
 
  // Fetch book by title
  const fetchBookByTitle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBook(response.data);
    } catch (err) {
      setError("Failed to fetch the book by title");
    }
  };

  // Add a new book
  const addBook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/books",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBooks([...books, response.data]);
      setError(null);
    } catch (err) {
      setError("Failed to add the book");
    }
  };

  / Update a book by title
  const updateBook = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/books/${title}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBook(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to update the book");
    }
  };

  // Delete a book by title
  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:5000/books/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((b) => b.title !== title));
      setError(null);
    } catch (err) {
      setError("Failed to delete the book");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="book-manager">
      <h1>Book Management</h1>

      <div className="book-form">
        <h2>Add/Update Book</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="publicationDate"
          placeholder="Publication Date"
          value={formData.publicationDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={formData.publisher}
          onChange={handleInputChange}
        />
        <button onClick={addBook}>Add Book</button>
        <button onClick={updateBook}>Update Book</button>
      </div>

      <div className="fetch-book">
        <h2>Fetch Book by Title</h2>
        <input
          type="text"
          placeholder="Enter Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={fetchBookByTitle}>Fetch Book</button>
        <button onClick={deleteBook}>Delete Book</button>
      </div>

      <div className="all-books">
        <h2>All Books</h2>
        <button onClick={fetchAllBooks}>Fetch All Books</button>
        {books.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
          </div>
        ))}
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ManageBooks;
