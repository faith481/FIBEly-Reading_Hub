import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/Assets/Frontend_Assets/fibely1.jpeg";
import cart_icon from "../assets/Assets/Frontend_Assets/cart_logo.jpeg";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>FIBEly HUB</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("fictions")}>
          <Link style={{ textDecoration: "none" }} to="/fiction">
            Fiction
          </Link>
          {menu === "fictions" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("non-fictions")}>
          <Link style={{ textDecoration: "none" }} to="/non-fiction">
            Non-fiction
          </Link>
          {menu === "non-fictions" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("others")}>
          <Link style={{ textDecoration: "none" }} to="/others">
            Others
          </Link>
          {menu === "others" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>signup</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
