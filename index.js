const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const articleRoutes = require('./routes/articleRoutes');
const path = require('path');

const app = express();

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (for serving images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api', donationRoutes);
app.use('/api', eventRoutes);
app.use('/api', articleRoutes);

// Test route
app.use('/home', (req, res) => {
    res.send('<h1>SAVE NATURE</h1>');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started and running at http://localhost:${PORT}`);
});
