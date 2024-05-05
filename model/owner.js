const mongoose = require('mongoose')
require('../config/dbconfig')
require('dotenv').config()



const productSchema = new mongoose.Schema({
    userId: {
        type: string,
    },
    products: [{
        image: { type: Array },
        name: { type: String },
        stock: { type: Number },
        price: { type: Number },
        date: { type: Date },
    }]

})
const products = mongoose.model(process.env.OWNER_COLLECTION, productSchema)
module.exports = products