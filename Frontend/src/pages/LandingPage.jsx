import React from "react";
import "./CSS/landing.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">
          welcome to FIBEly hub to Unleash the Power of Reading
        </h1>
        <p className="landing-subtitle">
          Discover a world of books at your fingertips. Immerse yourself in
          stories, knowledge, and inspiration.
        </p>
        <Link to="/signup" className="landing-btn">
          Start Your Journey
        </Link>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default LandingPage;
