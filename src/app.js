require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const trainRoutes = require('./routes/trainsRoute');
const locationRoutes = require('./routes/locationsRoute');
const scheduleLocationGeneration = require('./generateLocationCRON'); //imports

// Swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Train Tracking API',
            version: '1.0.0',
            description: 'API documentation for Train Tracking System',
        },
        servers: [
            {
                url: 'https://cobsccompy4231p-012-api-8e2e4fbeaabd.herokuapp.com/swagger',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
        scheduleLocationGeneration(); // Start generating location records
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    });

// Use routes
app.use('/api/trains', trainRoutes);    
app.use('/api/locations', locationRoutes);

// Error handling
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
