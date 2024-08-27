import axios from "axios";
import { useState, useEffect } from "react";
import "./CSS/backimage.css";
const BookDetail = () => {
  const [title, setTitle] = useState(""); // add a state for the title
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/books/${title}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch the book by title", err);
      }
    };
    if (title) {
      // only fetch the book if the title is set
      fetchBook();
    }
  }, [title]);

  const handleGetTitle = () => {
    // get the title from the user input
    const userInput = prompt("Enter the title of the book:");
    setTitle(userInput);
  };

  return (
    <div className="book-detail-container">
      <button className="get-book-button" onClick={handleGetTitle}>
        Search Title
      </button>
      {book && (
        <div>
          <h1 className="book-title">{book.title}</h1>
          <img
            className="book-image"
            src={`http://localhost:5000/${book.image}`}
            alt={book.title}
          />
          <p className="book-author">{book.author}</p>
          {/* Display the PDF */}
          <embed
            src={`http://localhost:5000/pdf/${book._id}`}
            width="100%"
            height="600px"
            type="application/pdf"
          />
        </div>
      )}
    </div>
  );
};

export default BookDetail;
