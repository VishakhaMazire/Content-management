const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },


}, { timestamps: true });


const PosterModel = mongoose.model('filesReceived', posterSchema);

module.exports = PosterModel;