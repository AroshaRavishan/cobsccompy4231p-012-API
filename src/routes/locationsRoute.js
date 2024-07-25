const express = require('express');
const router = express.Router();
const { getAllLocations } = require('../controllers/locationController');


// Route to get all locations
router.get('/', getAllLocations);

// // Route to get locations by TrainId
// router.get('/locations/train/:trainId', locationController.getLocationsByTrainId);

// // Route to add a new location
// router.post('/locations', locationController.addLocation);

module.exports = router;
