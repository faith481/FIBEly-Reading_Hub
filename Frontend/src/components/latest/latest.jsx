import React, { useEffect, useState } from "react";
import axios from "axios";
import Items from "../items/Items";
import "./latest.css";
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

  return (
    <div className="latest">
      <div className="latest-header">
        <h1>LATEST BOOKS</h1>
        <hr />
      </div>
      <div className="latest-items">
        {latestBooks.map((book, i) => (
          <div className="latest-item" key={i}>
            <Items
              id={book.id}
              title={book.title}
              image={`data:image/jpg/jpeg/png;base64,${book.image}`}
              author={book.author}
              new_price={book.new_price}
              old_price={book.old_price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
