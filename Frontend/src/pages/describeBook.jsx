import { useLocation } from "react-router-dom";
import "./CSS/describe.css";

const DescribeBooks = () => {
  const location = useLocation();
  const { book } = location.state || {}; // Retrieve the passed state

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
    <div className="describe-books">
      <img
        src={`http://localhost:5000/${book.image}`}
        alt={book.title}
        className="book-image"
      />
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">Author: {book.author}</p>
      <div className="prices">
        <p className="new-price">New Price: {book.new_price}</p>
        <p className="old-price">Old Price: {book.old_price}</p>
      </div>
    </div>
  );
};

export default DescribeBooks;
