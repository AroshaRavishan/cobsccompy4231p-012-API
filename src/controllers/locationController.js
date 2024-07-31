const Location = require('../models/locationsModel');
const Train = require('../models/trainsModel');

const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate('TrainId');
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchTrains = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Query parameter 'q' is required" });
        }
        const regex = new RegExp(q, 'i');

        // Query the Location collection and populate the TrainId field
        const locations = await Location.find().populate({
            path: 'TrainId',
            match: { trainName: { $regex: regex } }
        });

        // Filter out locations where TrainId is null (no match)
        const filteredLocations = locations.filter(location => location.TrainId !== null);

        res.json(filteredLocations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllLocations, searchTrains };


