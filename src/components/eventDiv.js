import React from 'react'

import PropTypes from 'prop-types'

import OutlineButton from './outline-button'
import './place-card.css'
import Popup from './Popup.js'
import { useState } from 'react';

const EventDiv = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="place-card-container">
      <img
        alt={props.imageAlt}
        src={props.image}
        className="place-card-image"
      />
      <div className="place-card-container1">
        <span className="place-card-text">{props.city}</span>
        <span className="place-card-text1">{props.description}</span>
        <button className='button-40'onClick={() => setButtonPopup(true)}>Open Popup</button>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>LOL</h3>
            {props.displayData}
            </Popup>
      </div>
    </div>
  )
}

EventDiv.defaultProps = {
  image:
    'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000',
  imageAlt: 'image',
  city: 'City Name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
}

EventDiv.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
}

export default EventDiv
