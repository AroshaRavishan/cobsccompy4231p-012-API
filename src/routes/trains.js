const express = require('express');
const router = express.Router();
const { getAllTrains } = require('../controllers/trainsController');

// GET endpoint
router.get('/', getAllTrains);

module.exports = router;
