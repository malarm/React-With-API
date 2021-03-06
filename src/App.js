import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard'

export default function App() {
  // NOTE: Default state for properties as empty array
  // to (1) allow render function to run though we have not received data from API
  // and (2) to show that we expect properties data to be of Type Array
  const defaultPropertiesState = []
  const [
    properties, // NOTE: state to store properties
    setProperties // NOTE: function to update properties state
  ] = useState(defaultPropertiesState) // NOTE: using React Hooks useState api

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(150);

  useEffect(() => {
    // NOTE: Using an ssync function to call the api and retrieve property data
    const fetchData = async () => {
      // NOTE: Fetch api property endpoint, and await response before proceeding
      const response = await fetch('/api/properties')
      // NOTE: If request was successfully processed, parse response
      if (response.ok) {
        // NOTE: Parse readable stream from response.body into json
        const data = await response.json()
        // NOTE: Save parsed data to property state
        setProperties(data)
      }
    }
    // NOTE: Call fetchData
    fetchData()
  }, []) // NOTE: Only fetch data on mount, not on any subsequent re-renders

  const updateMinPrice = e => setMinPrice(e.target.value);
  const updateMaxPrice = e => setMaxPrice(e.target.value);

  const filteredProperties = properties.filter(({ pricePerNight }) => {
    return pricePerNight <= maxPrice && pricePerNight >= minPrice
  })

  // NOTE: Render JSX
  return (
    <>
      <div className="search">
        <label>£
          <input type="number" value={minPrice} onChange={updateMinPrice} min="0" step="10"/>
        </label>
        -
        <label>£
          <input type="number" value={maxPrice} onChange={updateMaxPrice} min="0" step="10"/>
        </label>
      </div>
      <div className="list-wrapper">
        { // NOTE: For each property in the property array display a property card
          // NOTE: Declare the row (Object) of the array as "property"
          // NOTE: Use the spread operator to give all Object properties
          //       as named variables to the PropertyCard
          filteredProperties.map((property, idx) => <PropertyCard key={idx} index={idx} {...property}  />)
        }
      </div>
    </>
  )
}
