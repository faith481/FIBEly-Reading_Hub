import React, { useState, useCallback } from "react";
import axios from "axios";
import "./CSS/books.css";
import { jwtDecode } from "jwt-decode";
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
  const [SearchBook, setSearchBook] = useState(null);
  const token = localStorage.getItem("token");
  // const decodedToken = jwtDecode(token);

  //const checkTokenExpiration = () => {
  //  if (
  //    !decodedToken ||
  //    !decodedToken.exp ||
  //    decodedToken.exp * 1000 < Date.now()
  //  ) {
  //   setError("Invalid token or token has: expired");
  // }
  //};

  const getAllBooks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/protected/getBooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch books");
    }
  }, [token]);

  const getBookByTitle = useCallback(async () => {
    try {
      const encoded = title;
      const res = await axios.get(`http://localhost:5000/books/${encoded}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchBook(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch the book by title");
    }
  }, [token, title]);

  const addBook = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:5000/books", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBooks([...books, res.data]);
      setError(null);
    } catch (err) {
      setError("Failed to add the book");
    }
  }, [token, formData, books]);

  const updateBook = useCallback(async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/books/${title}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFormData(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to update the book");
    }
  }, [token, title, formData]);

  const deleteBook = useCallback(async () => {
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
  }, [token, title, books]);

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
        <button onClick={getBookByTitle}>Fetch Book</button>
        <button onClick={deleteBook}>Delete Book</button>
        {SearchBook && (
          <div>
            <h3>{SearchBook.title}</h3>
            <p>{SearchBook.author}</p>
            <p>{SearchBook.genre}</p>
          </div>
        )}
      </div>

      <div className="all-books">
        <h2>All Books</h2>
        <button onClick={getAllBooks}>Fetch All Books</button>
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
