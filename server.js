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
app.use(express.static(__dirname)); // This serves files from the public directory


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html')); // Adjust the path
});
  
  

// Use authentication routes
app.use('/api/auth', authRoutes.router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
