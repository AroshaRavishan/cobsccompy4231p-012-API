const express = require('express');
const router = express.Router();
const { getAllLocations, searchTrains, deleteAllLocations } = require('../controllers/locationController');


// Route to get all locations
router.get('/', getAllLocations);

// New search route
router.get('/search', searchTrains);

// Delete all locations (ONLY FOR TESTING PURPOSE)
router.get('/delete', deleteAllLocations);

module.exports = router;
