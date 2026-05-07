import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
    // 1. Create "States" to hold the data the user types in
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');

    // 2. This function runs when the "Submit" button is clicked
const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Basic Frontend Validation
    if (price <= 0) {
        return alert("Please enter a valid price greater than 0");
    }

    const newProperty = { title, price, location };

    axios.post('http://localhost:5000/api/properties', newProperty)
        .then(() => {
            alert("Property Added!");
            window.location.reload();
        })
        .catch(err => alert("Error adding property: " + err.message));
};

    return (
        <div style={{ border: '2px solid blue', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Property</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
                <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
                <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required />
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;