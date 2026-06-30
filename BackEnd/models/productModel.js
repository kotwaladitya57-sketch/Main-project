const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },

});

let products = mongoose.model("products", productSchema);
module.exports = products;
