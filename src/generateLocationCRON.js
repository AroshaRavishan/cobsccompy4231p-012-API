// generateLocationCRON.js
const Location = require('./models/locationsModel');
const Train = require('./models/trainsModel');
const cron = require('node-cron');

async function getLastLocation(trainId) {
    return await Location.findOne({ TrainId: trainId }).sort({ DateTime: -1 });
}

function getCurrentStationIndex(lastStationIndex, stations) {
    const stationsCount = stations.length;
    return Math.min(lastStationIndex + 1, stationsCount - 1);
}

async function updateTrainDirectionAndStation(train) {
    try {
        const { currentDirection, trainName } = train;

        const [currentStart, currentEnd] = currentDirection.split(' to ');

        const newDirection = `${currentEnd} to ${currentStart}`;

        train.currentDirection = newDirection;
        await train.save();
        
        console.log(`${trainName}'s direction flipped.\n New Direction is - ${newDirection}.`);
    } catch (error) {
        console.error('Error updating train direction and station:', error.message);
    }
}

async function generateLocationRecords() {
    try {
        const trains = await Train.find({ isActive: true }); // Fetch active trains

        for (const train of trains) {
            const { _id, startStation, endStation, stationsFromStart, stationsFromEnd, lastStation, currentDirection } = train;

            let stations;
            if (currentDirection === `${startStation} to ${endStation}`) {
                stations = stationsFromStart;
            } else if (currentDirection === `${endStation} to ${startStation}`) {
                stations = stationsFromEnd;
            } else {
                console.error(`Invalid direction: ${currentDirection} for train ${train.trainNumber}`);
                continue; // Skip this train if the direction doesn't match
            }

            const lastLocation = await getLastLocation(_id);
            let lastStationIndex = 0;

            if (lastLocation) {
                lastStationIndex = stations.indexOf(lastLocation.LastArrivedStation);
                if (lastStationIndex === -1) {
                    console.error(`Last arrived station ${lastLocation.LastArrivedStation} not found in stations array for train ${train.trainNumber}.`);
                    continue; // Skip this train if the last station is not found
                }
            }

            const currentStationIndex = getCurrentStationIndex(lastStationIndex, stations);
            const currentStation = stations[currentStationIndex];

            // Save the location record to the database
            const location = new Location({
                TrainId: _id,
                DateTime: new Date(),
                LastArrivedStation: currentStation,
            });

            await location.save();  
            console.log(`${train.trainName} has arrived at ${currentStation}.`);

            train.lastStation = currentStation;
            await train.save();

            if (currentStation === lastStation) {
                console.log(`${train.trainName} has arrived at the end of its tour at ${currentStation}.`);
                // Train reached last station, flip direction
                await updateTrainDirectionAndStation(train);
            }

            console.log('\n\n')
        }
    } catch (error) {
        console.error('Error generating location records:', error.message);
    }
}

function scheduleLocationGeneration() {
    cron.schedule('*/10 * * * * *', async () => {
        await generateLocationRecords();
    });
}

module.exports = scheduleLocationGeneration;