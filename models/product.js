const mongoose = require('mongoose');

// Schema Creation
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'You cannot have a price below zero']
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'diary', 'bird']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;