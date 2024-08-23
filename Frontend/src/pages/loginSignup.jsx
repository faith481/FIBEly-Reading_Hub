import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          username,
          email,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      navigate(`/welcome/${username}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-fields">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Continue</button>
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
