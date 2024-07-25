require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const trainRoutes = require('./routes/trainsRoute');
const locationRoutes = require('./routes/locationsRoute');

// Middleware
app.use(cors()); // Use cors before defining routes
app.use(express.json());

// MongoDB connection URI from environment variable
const dbURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to Database');
        startServer();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    });

// Use routes
app.use('/api/trains', trainRoutes);    
app.use('/api/locations', locationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
function startServer() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
