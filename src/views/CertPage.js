import React from 'react'

import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import SolidButton from '../components/solid-button'
import PlaceCard from '../components/place-card'
import './landing-page.css'
import NavBar from '../components/NavBar'
import { useState } from 'react';
import Popup from '../components/Popup'

export default function CertPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className='background-image-cert-page'>
            <div>
                <NavBar name="Cert"/>
            </div>
          <h1>Popup here</h1>
          <br></br>
          <button onClick={() => setButtonPopup(true)}>Open Popup</button>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>LOL</h3>
            </Popup>
        <div className="landing-page-cards-container">
          <PlaceCard
            city="V1"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
          ></PlaceCard>
                    <PlaceCard
            city="V2"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
          ></PlaceCard>
                    <PlaceCard
            city="V3"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
          ></PlaceCard>
                    <PlaceCard
            city="V4"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
          ></PlaceCard>
                    <PlaceCard
            city="V5"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
          ></PlaceCard>
                              <PlaceCard
            city="V6"
            image="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;h=1000"
          ></PlaceCard>
        </div>
            
        </div>
    )
  }
