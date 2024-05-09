const mongoose = require('mongoose');
require('../config/dbconfig');
require('dotenv').config();

const ProductSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    name: {
        type: String
    },
    image: {
        type: Array
    },
    date: {
        type: Date,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        default: false,
    },

});

const ProductModel = mongoose.model(process.env.PRODUCT_COLLECTION, ProductSchema);
module.exports = ProductModel;
