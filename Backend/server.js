// 1. IMPORTING LIBRARIES
const express = require('express'); // The framework for building the API
const mongoose = require('mongoose'); // Connects us to the Database
const cors = require('cors'); // Allows our Frontend to talk to this Backend
require('dotenv').config(); // Loads the hidden URL from the .env file

// 2. INITIALIZING THE APP
const app = express();
const Property = require('./models/Property'); // Import our house blueprint

// 3. MIDDLEWARE
app.use(express.json()); // Allows the server to understand JSON data sent by the user
app.use(cors()); // Security helper to allow cross-origin requests

// 4. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.log("Failed to connect:", err));

// 5. FUNCTIONS (Routes)
// This function GETS all houses from the database
app.get('/api/properties', async (req, res) => {
    try {
        const allProperties = await Property.find();
        res.status(200).json(allProperties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// This function SAVES a new house to the database
app.post('/api/properties', async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json({ message: "Property Added Successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Error saving data" });
    }
});

// DELETE a property by ID
app.delete('/api/properties/:id', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. STARTING THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});