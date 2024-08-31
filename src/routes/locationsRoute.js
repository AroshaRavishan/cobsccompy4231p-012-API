const express = require('express');
const router = express.Router();
const { getAllLocations, searchTrains, deleteAllLocations } = require('../controllers/locationController');

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     responses:
 *       200:
 *         description: A list of locations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllLocations);

/**
 * @swagger
 * /api/locations/search:
 *   get:
 *     summary: Search for trains by location
 *     responses:
 *       200:
 *         description: A list of trains matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/search', searchTrains);

/**
 * @swagger
 * /api/locations/delete:
 *   get:
 *     summary: Delete all locations (only for testing)
 *     responses:
 *       200:
 *         description: All locations have been deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/delete', deleteAllLocations);

module.exports = router;
