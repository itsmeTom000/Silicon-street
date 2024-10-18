const mongoose = require('mongoose');

const preBuildSchema = new mongoose.Schema({
    Image: {
        type: Buffer,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    detail_1: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('preBuild', preBuildSchema)