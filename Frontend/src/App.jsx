import { useState, useEffect } from 'react' // Import hooks for state and data
import axios from 'axios' // Tool to talk to the Backend
import './App.css'
import PropertyCard from './components/PropertyCard' // Custom component
import AddProperty from './components/AddProperty'   // Custom component

function App() {
  // 1. STATE: This is where we store the houses from the database
  const [properties, setProperties] = useState([])

  // 2. EFFECT: This runs as soon as the website opens
  useEffect(() => {
    // We request the list of properties from our Backend (Port 5000)
    axios.get('http://localhost:5000/api/properties')
      .then(response => {
        setProperties(response.data) // Save the list in our "properties" state
      })
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }, []) // The empty [] means "run only once"

  return (
    <div className="main-container">
      <header>
        <h1>Real Estate Management System</h1>
        <p>Project for CSE 470</p>
      </header>

      {/* 3. INPUT COMPONENT: The form to add new houses */}
      <section id="add-section">
        <AddProperty />
      </section>

      <div className="ticks"></div>

      {/* 4. DISPLAY SECTION: Mapping through our properties array */}
      <section id="property-list">
        <h2>Available Properties</h2>
        <div className="property-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {properties.length > 0 ? (
            properties.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))
          ) : (
            <p>No properties found in the database. Add one above!</p>
          )}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

export default App