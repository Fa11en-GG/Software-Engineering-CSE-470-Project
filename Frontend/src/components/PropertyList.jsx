import React from 'react';
import axios from 'axios';

const PropertyList = ({ properties, exchangeRate, currency }) => {
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            axios.delete(`http://localhost:5000/api/properties/${id}`)
                .then(() => {
                    alert("Property Deleted!");
                    window.location.reload();
                })
                .catch(err => console.error("Delete error:", err));
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {properties.map((item) => (
                <div key={item._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px', width: '250px', backgroundColor: '#f9f9f9' }}>
                    <h3>{item.title}</h3>
                    
                    {/* Logic to show Price based on selected currency */}
                    <p><strong>Price:</strong> {
                        currency === 'USD' 
                        ? `$${item.price}` 
                        : `${Math.round(item.price * exchangeRate)} BDT`
                    }</p>
                    
                    <p><strong>Location:</strong> {item.location}</p>
                    
                    <button 
                        onClick={() => handleDelete(item._id)} 
                        style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PropertyList;