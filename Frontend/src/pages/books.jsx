import React, { useState } from "react";
import axios from "axios";

const BookManager = () => {
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
