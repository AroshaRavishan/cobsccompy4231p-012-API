const Train = require('../models/train');

const getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllTrains };
