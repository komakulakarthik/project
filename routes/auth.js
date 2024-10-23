const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as needed
const router = express.Router();
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Staff = require('../models/Staff')

// Registration route
router.post('/register', async (req, res) => {
    const { name, email, username, password, role, ...roleSpecificFields } = req.body;

    // Validate input
    if (!name || !email || !username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
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
        const savedUser = await newUser.save();

        // Create role-specific document
        if (role === 'Patient') {
            const patient = new Patient({ userId: savedUser._id, ...roleSpecificFields });
            await patient.save();
        } else if (role === 'Doctor') {
            const doctor = new Doctor({ userId: savedUser._id, ...roleSpecificFields });
            await doctor.save();
        } else if (role === 'Staff') {
            const staff = new Staff({ userId: savedUser._id, ...roleSpecificFields });
            await staff.save();
        }

        res.status(201).json({
            message: 'User registered successfully!',
            redirectUrl: '/login.html'
         });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Error registering user.', error: error.message });
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
        if (user.role.toLowerCase() !== role.toLowerCase()) {  // Use toLowerCase for case-insensitive comparison
            return res.status(401).json({ message: 'Invalid role.' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Successful login
        res.status(200).json({ 
            message: 'Login successful!', 
            user: { name: user.name, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in.' });
    }
});

module.exports = { router };
