import React from 'react'
import PlaceCard from '../components/place-card'
import '../css/landing-page.css'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react';
import { signup, useAuth, logout, login, } from "../firebase";
import db from '../firebase';
import { onSnapshot, collection, addDoc } from "firebase/firestore";


export default function CertPage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const currentUser = useAuth()
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch event data here, similar to your ActivitiesPage code
    // You can use Firebase or any other data source you have
    // For demonstration, I'll use a placeholder data array
    onSnapshot(collection(db, "EventsTest"), (snapshot) =>
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);


    return (
        <div>
            <div>
                <NavBar name="Cert" currentUser={currentUser} />
            </div>
        <div className="landing-page-cards-container">
            {events.map((event) => (
            <PlaceCard
            key={event.id} city={event.name} description={event.description} image={event.image} eventPax={event.eventPax}
            >
              
            </PlaceCard>
            ))}
 
        </div>
            
        </div>
    )
  }
