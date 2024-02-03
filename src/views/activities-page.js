import React from 'react'
import { useEffect, useState } from "react";
import db from "../firebase";
import PlaceCard from '../components/place-card'
import '../css/landing-page.css'
import NavBar from '../components/NavBar'
import { handleNewEvents, handleEditEvents, handleDeleteEvents, handleQueryDeleteEvents } from  "../UtilEvents"
import { onSnapshot, collection, addDoc } from 'firebase/firestore';

const ActivitiesPage = () => {

    const [event, setEvents] = useState([{name: "Loading..."}]);
    useEffect(
      () => onSnapshot(collection(db, "EventsTest"), (snapshot) => 
      setEvents(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      []
    );

    return (
        <div>
            <div className='background-image-activites-page'>
                <NavBar name = "Activities" />
            </div>
        <div>
        
        {event.map((event) => (
                <div className='landing-page-cards-container' key={event.id}>
                    <PlaceCard
                        city={event.name}
                    ></PlaceCard>
                </div>
              ))}
        </div>
            
        </div>

    )
}

export default ActivitiesPage