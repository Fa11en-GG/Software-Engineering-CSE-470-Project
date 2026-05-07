import React from 'react';
import axios from 'axios';

const PropertyList = ({ properties }) => {
    
    // Function to handle the Delete action
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            axios.delete(`http://localhost:5000/api/properties/${id}`)
                .then(() => {
                    alert("Property Deleted!");
                    window.location.reload(); // Refresh the page to see the updated list
                })
                .catch(err => {
                    console.error("Delete error:", err);
                    alert("Failed to delete property.");
                });
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {properties.map((item) => (
                <div key={item._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px', width: '250px' }}>
                    <h3>{item.title}</h3>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    {/* The Delete Button */}
                    <button 
                        onClick={() => handleDelete(item._id)} 
                        style={{ 
                            backgroundColor: '#e74c3c', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 12px', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;