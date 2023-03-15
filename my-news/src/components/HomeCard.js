import React from 'react'
import "../styles/homeCart.css"

const HomeCard = ({imageSrc, title, description, date, link}) => {
  return (
    <div className="cart">
    <img src={imageSrc} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
    <p>{date}</p>
    <a href={link}>See new</a>
  </div>
  )
}

export default HomeCard