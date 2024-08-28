import React, { useState, useCallback } from "react";
import axios from "axios";
import "./CSS/books.css";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
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

  const token = localStorage.getItem("token");

  const showNotification = (message, type = "") => {
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    const notificationElement = document.createElement("div");
    notificationElement.className = `notification ${type}`;
    notificationElement.innerHTML = message;

    notificationContainer.appendChild(notificationElement);

    setTimeout(() => {
      notificationElement.remove();
    }, 3000);
  };

  const getAllBooks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/protected/getBooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data);
      showNotification("Fetched all books successfully!");
    } catch (err) {
      //showNotification("Failed to fetch books", "error");
    }
  }, [token]);

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
      uploadImage.append("image", formData.image);
      uploadImage.append("pdfFile", formData.pdfFile);

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

      if (res.status === 201) {
        setBooks([...books, res.data]);
        showNotification("Book added successfully!");
      } else {
        showNotification("Failed to add book. Please try again.", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to add the book", "error");
    }
  }, [token, formData, books]);

  const deleteBook = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:5000/books/deltitle/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(books.filter((b) => b.title !== title));
      showNotification("Book deleted successfully!");
    } catch (err) {
      showNotification("Failed to delete the book", "error");
    }
  }, [token, title, books]);

  const handleInputChange = (e) => {
    if (e.target.name === "newPrice" || e.target.name === "oldPrice") {
      const newValue = parseFloat(e.target.value);
      if (isNaN(newValue) || newValue < 0) {
        showNotification("Invalid price value", "error");
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

      <div id="notification-container"></div>

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
          placeholder="New Price"
          value={formData.newPrice}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleInputChange}
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <input type="file" name="pdfFile" onChange={handlePdfChange} />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="fetch-book">
        <h2>Fetch Book by Title</h2>
        <input
          type="text"
          placeholder="Enter Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={deleteBook}>Delete Book</button>
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
    </div>
  );
};

export default ManageBooks;
