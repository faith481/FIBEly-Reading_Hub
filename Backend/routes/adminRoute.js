const express = require("express");
const admRouter = express.Router();
const User = require("../models/userModel");
const requireRole = require("../middleware/middleRole");

// Admin: Get all users
admRouter.get("/users", requireRole("admin"), async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// Admin: Delete a user
admRouter.delete("/user/:id", requireRole("admin"), async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = admRouter;
