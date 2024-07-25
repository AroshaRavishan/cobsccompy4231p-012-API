const Location = require('../models/locationsModel');

const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate('TrainId');
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllLocations };


