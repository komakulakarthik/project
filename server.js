// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from a specific directory (e.g., public)
app.use(express.static(path.join(__dirname, 'public'))); 

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables.');
    process.exit(1); // Exit if MongoDB URI is not set
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy!' });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html')); // Adjust the path
});

// Use authentication routes
app.use('/api/auth', authRoutes.router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
