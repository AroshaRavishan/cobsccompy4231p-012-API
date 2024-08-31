const express = require('express');
const router = express.Router();
const {
    getAllTrains,
    getTrainById,
    getTrainByNumber,
    getTrainByName,
    getTrainsByRoute,
    getTrainsByActiveStatus,
    getTrainsByDay,
    getTrainsByExpressStatus,
    getTrainsByStartStation,
    getTrainsByEndStation,
} = require('../controllers/trainsController');

/**
 * @swagger
 * /api/trains:
 *   get:
 *     summary: Get all trains
 *     responses:
 *       200:
 *         description: A list of trains.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllTrains);

/**
 * @swagger
 * /api/trains/{id}:
 *   get:
 *     summary: Get a train by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The train ID
 *     responses:
 *       200:
 *         description: A train object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/:id', getTrainById);

/**
 * @swagger
 * /api/trains/number/{trainNumber}:
 *   get:
 *     summary: Get a train by its number
 *     parameters:
 *       - in: path
 *         name: trainNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The train number
 *     responses:
 *       200:
 *         description: A train object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/number/:trainNumber', getTrainByNumber);

/**
 * @swagger
 * /api/trains/name/{trainName}:
 *   get:
 *     summary: Get a train by its name
 *     parameters:
 *       - in: path
 *         name: trainName
 *         schema:
 *           type: string
 *         required: true
 *         description: The train name
 *     responses:
 *       200:
 *         description: A train object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/name/:trainName', getTrainByName);

/**
 * @swagger
 * /api/trains/route/{routeName}:
 *   get:
 *     summary: Get trains by route name
 *     parameters:
 *       - in: path
 *         name: routeName
 *         schema:
 *           type: string
 *         required: true
 *         description: The route name
 *     responses:
 *       200:
 *         description: A list of trains by route name.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/route/:routeName', getTrainsByRoute);

/**
 * @swagger
 * /api/trains/active/{status}:
 *   get:
 *     summary: Get trains by active status
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: The active status (true/false)
 *     responses:
 *       200:
 *         description: A list of trains by active status.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/active/:status', getTrainsByActiveStatus);

/**
 * @swagger
 * /api/trains/day/{day}:
 *   get:
 *     summary: Get trains by day of operation
 *     parameters:
 *       - in: path
 *         name: day
 *         schema:
 *           type: string
 *         required: true
 *         description: The day of operation
 *     responses:
 *       200:
 *         description: A list of trains by day of operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/day/:day', getTrainsByDay);

/**
 * @swagger
 * /api/trains/express/{status}:
 *   get:
 *     summary: Get trains by express status
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: The express status (true/false)
 *     responses:
 *       200:
 *         description: A list of trains by express status.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/express/:status', getTrainsByExpressStatus);

/**
 * @swagger
 * /api/trains/startStation/{stationName}:
 *   get:
 *     summary: Get trains by start station
 *     parameters:
 *       - in: path
 *         name: stationName
 *         schema:
 *           type: string
 *         required: true
 *         description: The start station name
 *     responses:
 *       200:
 *         description: A list of trains by start station.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/startStation/:stationName', getTrainsByStartStation);

/**
 * @swagger
 * /api/trains/endStation/{stationName}:
 *   get:
 *     summary: Get trains by end station
 *     parameters:
 *       - in: path
 *         name: stationName
 *         schema:
 *           type: string
 *         required: true
 *         description: The end station name
 *     responses:
 *       200:
 *         description: A list of trains by end station.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/endStation/:stationName', getTrainsByEndStation);

module.exports = router;
