const mongoose = require('mongoose');

// Define the schema for the Car collection
const f1TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    winsIn2023Season: {
        type: Number,
        required: true
    },
    polePositionsIn2023Season: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const TeamModal = mongoose.model('team', f1TeamSchema)


module.exports = { TeamModal }