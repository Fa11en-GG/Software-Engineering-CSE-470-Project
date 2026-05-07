import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This component fetches and displays the houses from our backend
const PropertyList = () => {
    const [properties, setProperties] = useState([]); // State to store our house list

    // This runs as soon as the page loads
    useEffect(() => {
        // We "call" our backend server
        axios.get('http://localhost:5000/api/properties')
            .then(response => {
                setProperties(response.data); // Put the data into our state
            })
            .catch(error => console.error("Error fetching properties:", error));
    }, []);

    return (
        <div>
            <h2>Available Properties</h2>
            <div className="property-grid">
                {properties.map(house => (
                    <div key={house._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h3>{house.title}</h3>
                        <p>Price: ${house.price}</p>
                        <p>{house.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;