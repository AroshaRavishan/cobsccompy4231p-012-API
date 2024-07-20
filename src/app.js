const express = require('express');
const mongoose = require('mongoose');
const app = express();
const trainRoutes = require('./routes/trains');

app.use(express.json());

// MongoDB connection URI
const dbURI = 'mongodb+srv://mgaravishan:passwordadmin@cluster0.g1wu4gq.mongodb.net/SLR_db?retryWrites=true&w=majority&appName=Cluster0';

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
app.use('/trains', trainRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

function startServer() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
