import React, { useEffect, useState } from "react";
import axios from "axios";
import Items from "../items/Items";
import "./latest.css";
import { Link } from "react-router-dom";
import { addToCart, showNotification } from "./addtoCart";

const Latest = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/new/latest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setLatestBooks(response.data);
      } catch (error) {
        console.error("Error fetching latest books:", error);
      }
    };

    fetchLatestBooks();
  }, []);

  const handleAddToCart = (bookId) => {
    addToCart(bookId)
      .then((cart) => {
        showNotification("Book added to cart successfully!", "success");
        console.log(cart);
      })
      .catch((err) => {
        showNotification(
          "Failed to add book to cart. Please try again.",
          "error"
        );
        console.error(err);
      });
  };

  return (
    <div className="latest">
      <div className="latest-header">
        <h1>LATEST BOOKS</h1>
        <hr />
      </div>
      <div className="latest-items">
        {latestBooks.map((book, i) => (
          <div className="latest-item" key={i}>
            <Link to={`/describe/${book._id}`} state={{ book: book }}>
              <Items
                book={book}
                id={book._id}
                title={book.title}
                image={`http://localhost:5000/${book.image}`}
                author={book.author}
                new_price={book.newPrice}
                old_price={book.oldPrice}
                pdf={book.pdfFile}
              />
            </Link>
            <button onClick={() => handleAddToCart(book._id)}>
              Add to Cart
            </button>
          </div>
        ))}
        <div id="notification-container"></div>
      </div>
    </div>
  );
};

export default Latest;
