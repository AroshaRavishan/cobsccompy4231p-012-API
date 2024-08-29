const Train = require('../models/trainsModel');

const getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainById = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainByNumber = async (req, res) => {
    try {
        const train = await Train.findOne({ trainNumber: req.params.trainNumber });
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get train by train name
const getTrainByName = async (req, res) => {
    try {
        const trainName = decodeURIComponent(req.params.trainName);
        const train = await Train.findOne({ trainName: trainName });
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainsByRoute = async (req, res) => {
    try {
        const routeName = decodeURIComponent(req.params.routeName);
        const trains = await Train.find({ routeName: routeName });
        if (trains.length === 0) {
            return res.status(404).json({ message: 'No trains found for this route' });
        }
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainsByActiveStatus = async (req, res) => {
    try {
        const status = req.params.status === 'true';
        const trains = await Train.find({ isActive: status });
        if (trains.length === 0) {
            return res.status(404).json({ message: `No trains found with active status ${status}` });
        }
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainsByDay = async (req, res) => {
    try {
        const day = decodeURIComponent(req.params.day);
        const trains = await Train.find({ days: day });
        if (trains.length === 0) {
            return res.status(404).json({ message: `No trains found operating on ${day}` });
        }
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainsByExpressStatus = async (req, res) => {
    try {
        const status = req.params.status === 'true';
        const trains = await Train.find({ isExpress: status });
        if (trains.length === 0) {
            return res.status(404).json({ message: `No trains found with express status ${status}` });
        }
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainsByStartStation = async (req, res) => {
    try {
        const stationName = decodeURIComponent(req.params.stationName);
        const trains = await Train.find({ startStation: stationName });
        if (trains.length === 0) {
            return res.status(404).json({ message: `No trains found starting at ${stationName}` });
        }
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTrainsByEndStation = async (req, res) => {
    try {
        const stationName = decodeURIComponent(req.params.stationName);
        const trains = await Train.find({ endStation: stationName });
        if (trains.length === 0) {
            return res.status(404).json({ message: `No trains found ending at ${stationName}` });
        }
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllTrains, getTrainById, getTrainByNumber, getTrainByName, getTrainsByRoute, getTrainsByActiveStatus, getTrainsByDay, getTrainsByExpressStatus, getTrainsByStartStation, getTrainsByEndStation };
