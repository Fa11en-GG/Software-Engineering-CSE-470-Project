import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import PropertyList from "./components/PropertyList"
import AddProperty from './components/AddProperty'

function App() {
  const [properties, setProperties] = useState([])
  const [exchangeRate, setExchangeRate] = useState(1)
  const [currency, setCurrency] = useState('USD') // Toggle state

  useEffect(() => {
    // 1. Fetch Internal MERN Data
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setProperties(response.data)
      })
      .catch(error => console.error("Internal API Error:", error))

    // 2. Fetch External Currency Data (ExchangeRate-API)
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(res => {
        setExchangeRate(res.data.rates.BDT)
        console.log("External API: Rates updated successfully")
      })
      .catch(error => console.error("External API Error:", error))
  }, [])

  return (
    <div className="main-container">
      <header>
        <h1>Real Estate Management System</h1>
        <p>Project for CSE 470 | Connected to External Exchange API</p>
        
        {/* Currency Toggle Button */}
        <button 
          onClick={() => setCurrency(currency === 'USD' ? 'BDT' : 'USD')}
          style={{ padding: '10px', marginTop: '10px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#3498db', color: 'white', border: 'none' }}
        >
          Switch to {currency === 'USD' ? 'BDT' : 'USD'} View
        </button>
      </header>

      <section id="add-section">
        <AddProperty />
      </section>

      <section id="property-list">
        <h2>Available Properties ({currency})</h2>
        {properties.length > 0 ? (
          <PropertyList 
            properties={properties} 
            exchangeRate={exchangeRate} 
            currency={currency} 
          />
        ) : (
          <p>No properties found in the database.</p>
        )}
      </section>
    </div>
  )
}

export default App