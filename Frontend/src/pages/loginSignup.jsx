import React from "react";
import "./CSS/LoginSignup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-fields">
          <input type="text" placeholder="your Name" />
          <input type="text" placeholder="email address" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="Confirm password" />
        </div>
        <button>Continue</button>
        <p className="signup-login">
          Already have an account?
          <Link to="/login">
            <button>Login here</button>
          </Link>
        </p>
        <div className="signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use and Piracy policy</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
