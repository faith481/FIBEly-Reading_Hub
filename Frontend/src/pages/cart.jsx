import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/cart.css";
import Latest from "../components/latest/latest";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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
      calculateTotalPrice(res.data.cart.books);
    } catch (err) {
      setError("Failed to fetch cart");
    }
  };

  // Function to add a book to the cart
  const addToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/cart/add",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCart(res.data.cart.books);
      calculateTotalPrice(res.data.cart.books);
    } catch (err) {
      setError("Failed to add book to cart");
    }
  };

  // Function to calculate the total price of the books in the cart
  const calculateTotalPrice = (books) => {
    const totalPrice = books.reduce(
      (acc, book) => acc + parseFloat(book.newPrice),
      0
    );
    setTotalPrice(totalPrice);
  };

  // Fetch the cart when the component mounts
  useEffect(() => {
    fetchCart();
    console.log(cart);
  }, []);

  // Function to handle payment
  const handlePayment = () => {
    // Redirect to payment method
    window.location.href = "/payment";
  };

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
            <p>Price: ${item.newPrice}</p>
          </li>
        ))}
      </ul>
      <p className="total-price">Total Price: ${totalPrice}</p>
      <button className="payment-button" onClick={handlePayment}>
        Proceed to Payment
      </button>
      {/* <Latest addToCart={addToCart} /> */}
    </div>
  );
};

export default Cart;
