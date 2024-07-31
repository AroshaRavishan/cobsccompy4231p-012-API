const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    TrainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: true
    },
    DateTime: {
        type: Date,
        required: true
    },
    LastArrivedStation: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);
