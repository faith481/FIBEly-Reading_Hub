import React, { useState, useCallback } from "react";
import axios from "axios";
import "./CSS/books.css";
//import { jwtDecode } from "jwt-decode";
const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    publisher: "",
    newPrice: "",
    oldPrice: "",
    image: null,
    pdfFile: null,
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
      const res = await axios.get(`http://localhost:5000/books/${title}`, {
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
      const uploadImage = new FormData();
      uploadImage.append("title", formData.title);
      uploadImage.append("author", formData.author);
      uploadImage.append("genre", formData.genre);
      uploadImage.append("publicationDate", formData.publicationDate);
      uploadImage.append("publisher", formData.publisher);
      uploadImage.append("newPrice", formData.newPrice);
      uploadImage.append("oldPrice", formData.oldPrice);
      uploadImage.append("image", formData.image); // file input
      uploadImage.append("pdfFile", formData.pdfFile);

      // {
      // uri: formData.image && formData.image.uri,
      // filename: formData.image && formData.image.name,
      // type: formData.image && formData.image.type,
      //});
      const res = await axios.post(
        "http://localhost:5000/books/upload",
        uploadImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBooks([...books, res.data]);
      setError(null);
    } catch (err) {
      console.error(err);
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
      await axios.delete(`http://localhost:5000/books/deltitle/${title}`, {
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
    if (e.target.name === "newPrice" || e.target.name === "oldPrice") {
      const newValue = parseFloat(e.target.value);
      if (isNaN(newValue) || newValue < 0) {
        setError("Invalid price value");
      } else {
        setFormData({ ...formData, [e.target.name]: newValue });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePdfChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
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
        <input
          type="text"
          name="newPrice"
          placeholder="newPrice"
          value={formData.newPrice}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="oldPrice"
          placeholder="oldPrice"
          value={formData.oldPrice}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <input type="file" name="pdfFile" onChange={handlePdfChange} />I
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
