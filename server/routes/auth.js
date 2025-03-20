const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
  
      // Check if all required fields are provided
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }
  
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Respond with success message
      res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  });

// Login route
// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    // Validate password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true, 
      // secure: process.env.NODE_ENV === 'production', 
      secure: false, 
      // sameSite: 'none', 
      // maxAge: 24 * 60 * 60 * 1000,
      // path: '/',
    });

    // Respond with success message and user data (excluding sensitive info)
    res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user._id, name: user.name, email: user.email, photo: user.photo },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    // sameSite: 'none',
    secure: false,
    // path: '/',
  });
  res.status(200).json({ message: 'Logout successful' });
});






module.exports = router;
