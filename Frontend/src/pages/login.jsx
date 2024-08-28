import React, { useState } from "react";
import "./CSS/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        navigate("/home"); // Redirect to the home route
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      // Assuming a 400 bad request Unauthorized error means invalid credentials
      if (err.response && err.response.status === 400) {
        setError("Invalid username or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
