import React from "react";

const Welcome = ({ username }) => {
  return (
    <div className="welcome">
      <h1>Welcome, {username}!</h1>
      <p>FIBEly hub is the best reading hub in the world</p>
    </div>
  );
};

export default Welcome;
