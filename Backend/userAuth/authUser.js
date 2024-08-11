const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

class UserAuth {
  // Signup method
  static async signup(req, res) {
    try {
      const { email, password, username, role } = req.body;

      // Edge case: Check if username is provided
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }

      // Edge case: Check if email is provided
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Edge case: Check if password is provided
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const user = new User({
        email,
        username,
        passwordHash: hashedPassword,
        role,
      });

      // Save the user to the database
      await user.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error in signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Login method
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Edge case: Check if email is provided
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Edge case: Check if password is provided
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Logout method
  static async logout(req, res) {
    try {
      // Invalidate the token or clear the session
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error in logout:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserAuth;
