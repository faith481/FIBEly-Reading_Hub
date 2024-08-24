import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  // Function to get the user's cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/cart/getCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setCart(res.data.cart.books);
    } catch (err) {
      setError("Failed to fetch cart");
    }
  };

  // Function to add a book to the cart
  const addToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/cart/add",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCart(res.data.cart.books);
    } catch (err) {
      setError("Failed to add book to cart");
    }
  };

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
    console.log(cart);
  }, []);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.bookId} className="cart-item">
            <img src={item.image} />
            <p>Book Title: {item.title}</p>
            <p>Author: {item.author}</p>
            <p>Publisher: {item.publisher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
