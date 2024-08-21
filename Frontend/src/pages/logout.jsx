import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call API to logout user
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="logout-container">
      <h1 className="logout-header">Logout</h1>
      <p className="logout-text">Are you sure you want to logout?</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
