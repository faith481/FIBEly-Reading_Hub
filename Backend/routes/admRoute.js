const express = require("express");
const uRouter = express.Router();
const User = require("../models/userModel");
const authenticateJWT = require("../middleware/middleAuth");

// Route to get the logged-in user's role
uRouter.get("/user", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the authenticated user's ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user role", error });
  }
});

module.exports = uRouter;
