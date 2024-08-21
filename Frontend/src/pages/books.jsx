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
