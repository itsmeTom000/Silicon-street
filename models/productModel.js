const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    detail_2: {
        type: String,
        required: true
    },
    detail_3: {
        type: String,
        required: true
    },
    detail_4: {
        type: String,
        required: true
    },
    detail_5: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema)