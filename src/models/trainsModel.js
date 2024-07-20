const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNumber: String,
    trainName: String,
    startStation: String,
    endStation: String,
    routeName: String,
    days: [String],
    stationsFromStart: [String],
    stationsFromEnd: [String],
    currentDirection: String,
    lastStation: String,
    isActive: Boolean,
    isExpress: Boolean
});

module.exports = mongoose.model('Train', trainSchema);
