const mongoose = require('mongoose');

// This defines what information we store for every property
const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Example: "Luxury Villa"
    price: { type: Number, required: true }, // Example: 500000
    location: String,                         // Example: "New York"
    description: String                       // Example: "3 bedrooms, 2 bathrooms"
});

// We export this so the server can use it to save/find houses
module.exports = mongoose.model('Property', PropertySchema);