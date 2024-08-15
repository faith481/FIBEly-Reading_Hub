const express = require("express");
const authenticateJWT = require("../middleware/middleAuth");
const pRouter = express.Router();

// Example Protected Route
pRouter.get("/dashboard", authenticateJWT, (req, res) => {
  try {
    console.log("User:", req.user);
    res.json({ message: `Welcome to the dashboard,  ${req.user.userName}` });
    //{req.user.username}
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = pRouter;
