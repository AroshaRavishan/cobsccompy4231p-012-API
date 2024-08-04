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

// const searchTrains = async (req, res) => {
//     try {
//         const { searchBar, startStation, endStation, dateTime } = req.query;
//         console.log("Received query parameters:", { searchBar, startStation, endStation, dateTime });

//         // First, let's get all locations without any filtering
//         let allLocations = await Location.find().populate('TrainId');
//         console.log("Total locations in database:", allLocations.length);

//         // Log a few sample documents
//         console.log("Sample documents:", allLocations.slice(0, 3).map(loc => ({
//             DateTime: loc.DateTime,
//             TrainName: loc.TrainId ? loc.TrainId.trainName : 'N/A',
//             StartStation: loc.TrainId ? loc.TrainId.startStation : 'N/A',
//             EndStation: loc.TrainId ? loc.TrainId.endStation : 'N/A'
//         })));

//         // Now, let's apply our filters one by one
//         let filteredLocations = allLocations;

//         if (dateTime) {
//             const queryDate = new Date(dateTime);
//             const startOfDay = new Date(queryDate);
//             startOfDay.setUTCHours(0, 0, 0, 0);
//             const endOfDay = new Date(queryDate);
//             endOfDay.setUTCHours(23, 59, 59, 999);

//             filteredLocations = filteredLocations.filter(loc =>
//                 loc.DateTime >= startOfDay && loc.DateTime <= endOfDay
//             );
//             console.log("Locations after date filter:", filteredLocations.length);
//         }

//         if (searchBar) {
//             filteredLocations = filteredLocations.filter(loc =>
//                 loc.TrainId && loc.TrainId.trainName.toLowerCase().includes(searchBar.toLowerCase())
//             );
//             console.log("Locations after searchBar filter:", filteredLocations.length);
//         }

//         if (startStation) {
//             filteredLocations = filteredLocations.filter(loc =>
//                 loc.TrainId && loc.TrainId.startStation.toLowerCase().includes(startStation.toLowerCase())
//             );
//             console.log("Locations after startStation filter:", filteredLocations.length);
//         }

//         if (endStation) {
//             filteredLocations = filteredLocations.filter(loc =>
//                 loc.TrainId && loc.TrainId.endStation.toLowerCase().includes(endStation.toLowerCase())
//             );
//             console.log("Locations after endStation filter:", filteredLocations.length);
//         }

//         console.log("Final filtered locations:", filteredLocations.length);

//         // Log sample results
//         console.log("Sample results:", filteredLocations.slice(0, 2).map(loc => ({
//             DateTime: loc.DateTime,
//             TrainName: loc.TrainId ? loc.TrainId.trainName : 'N/A',
//             StartStation: loc.TrainId ? loc.TrainId.startStation : 'N/A',
//             EndStation: loc.TrainId ? loc.TrainId.endStation : 'N/A'
//         })));

//         res.json(filteredLocations);
//     } catch (err) {
//         console.error("Error in searchTrains:", err);
//         res.status(500).json({ message: err.message });
//     }
// };


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

        res.json(filteredLocations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllLocations, searchTrains };


