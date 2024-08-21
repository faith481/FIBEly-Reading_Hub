import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CSS/welcome.css";
const Welcome = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome">
      <h1>Welcome to FIBEly reading hub, {username}!</h1>
      <p>FIBEly hub is the best reading hub in the world</p>
    </div>
  );
};

export default Welcome;
