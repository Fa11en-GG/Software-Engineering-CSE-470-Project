const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"],
        trim: true 
    },
    price: { 
        type: Number, 
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"] // VALIDATION
    },
    location: { 
        type: String, 
        required: [true, "Location is required"] 
    }
});

module.exports = mongoose.model('Property', PropertySchema);