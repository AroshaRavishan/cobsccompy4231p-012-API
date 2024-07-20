const express = require('express');
const router = express.Router();
const { getAllTrains, getTrainById, getTrainByNumber, getTrainByName, getTrainsByRoute, getTrainsByActiveStatus, getTrainsByDay, getTrainsByExpressStatus, getTrainsByStartStation, getTrainsByEndStation } = require('../controllers/trainsController');

// GET all trains
router.get('/', getAllTrains);

// GET train by ID
router.get('/:id', getTrainById);

// GET train by train number
router.get('/number/:trainNumber', getTrainByNumber);

// New route: GET train by train name
router.get('/name/:trainName', getTrainByName);

// GET trains by route name
router.get('/route/:routeName', getTrainsByRoute);

// GET trains by active status
router.get('/active/:status', getTrainsByActiveStatus);

// GET trains by day of operation
router.get('/day/:day', getTrainsByDay);

// GET trains by express status
router.get('/express/:status', getTrainsByExpressStatus);

// GET trains by start station
router.get('/startStation/:stationName', getTrainsByStartStation);

// GET trains by end station
router.get('/endStation/:stationName', getTrainsByEndStation);

module.exports = router;
