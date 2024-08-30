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

// Delete all locations (ONLY FOR TESTING PURPOSE)
const deleteAllLocations = async (req, res) => {
    try {
        await Location.deleteMany({});
        res.status(200).json({ message: 'All locations deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchTrains = async (req, res) => {
    try {
        const { searchBar, startStation, endStation, dateTime } = req.query;

        // Get all locations without any filtering
        let allLocations = await Location.find().populate('TrainId');

        // Apply filters one by one
        let filteredLocations = allLocations;

        if (dateTime) {
            const queryDate = new Date(dateTime);
            const startOfDay = new Date(queryDate);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(queryDate);
            endOfDay.setUTCHours(23, 59, 59, 999);

            filteredLocations = filteredLocations.filter(loc =>
                loc.DateTime >= startOfDay && loc.DateTime <= endOfDay
            );
        }

        if (searchBar) {
            filteredLocations = filteredLocations.filter(loc =>
                loc.TrainId && loc.TrainId.trainName.toLowerCase().includes(searchBar.toLowerCase())
            );
        }

        if (startStation) {
            filteredLocations = filteredLocations.filter(loc =>
                loc.TrainId && loc.TrainId.startStation.toLowerCase().includes(startStation.toLowerCase())
            );
        }

        if (endStation) {
            filteredLocations = filteredLocations.filter(loc =>
                loc.TrainId && loc.TrainId.endStation.toLowerCase().includes(endStation.toLowerCase())
            );
        }

        if (startStation && endStation) {
            filteredLocations = filteredLocations.filter(loc =>
                loc.TrainId.startStation.toLowerCase().includes(startStation.toLowerCase()) && loc.TrainId.endStation.toLowerCase().includes(endStation.toLowerCase())
            );
        }

        res.json(filteredLocations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllLocations, searchTrains , deleteAllLocations };


