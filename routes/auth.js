const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as needed
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    console.log('Request Body:', req.body); // Add this line
    const { name, email, username, password, role } = req.body;

    // Validate input
    if (!name || !email || !username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error.message); // Log the error message
    res.status(500).json({ message: 'Error registering user.', error: error.message }); // Optionally send the error message back
}
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required.' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Check if the role matches
        if (user.role !== role) {
            return res.status(401).json({ message: 'Invalid role.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in.' });
    }
});


module.exports = { router };
