import React from 'react'

export default function PropertyCard ({
  index, // NOTE: We're using index to get different images for each card (in lack of provided data)
  owner,
  address,
  airbnbId,
  numberOfBedrooms,
  numberOfBathrooms,
  incomeGenerated,
  guest,
  pricePerNight,
}) {
  // NOTE:
  const { city, postCode, line1, line2 } = address // NOTE: define expected address variables
  const imageIterator = index + 1 // NOTE: Use index to create new filepath for images inside the public-folder
  const imageUrl = `/img/${imageIterator}.jpg` // NOTE: url for random home images I found on google
  const ownerImageUrl = `/img/${imageIterator}-owner.jpeg` // NOTE: url for random user images from uifaces.co
  const ownerName = owner.substring(0,1).toUpperCase() + owner.substring(1,999).toLowerCase()
  return (
    <div className="card">
      <img src={imageUrl} className="img"/>
      <div className="info guests">
        {guest} Guests
      </div>
      <Price amount={pricePerNight}/>
      <div className="info address">
        <span style={{display: 'block'}}>{line1} {line2}</span>
        <span style={{display: 'block'}}>{postCode}, {city}</span>
      </div>
      <div className="info facilities">
        <div className="facility">
          <span className="facility-number">🛏 {numberOfBedrooms}</span> Bedrooms
        </div>
        <div className="facility">
          <span className="facility-number">🛁 {numberOfBathrooms}</span> Bathrooms
        </div>
      </div>
      <div className="info owner-box">
        <div className="owner-label">Owner</div>
        <div className="owner">
          <img src={ownerImageUrl} className="owner-img"/>
          <div className="owner-name">{ownerName}</div>
        </div>
      </div>
    </div>
)}

const Price = ({ amount }) => {
  const formattedAmount = Number(amount).toFixed(2) // NOTE: Price formatted as standard 2 decimals, like 1,500.00
  return (
  <div className="info">
    <span className="price">£{formattedAmount}</span>
    <span className="price-unit">/night</span>
  </div>
)}
