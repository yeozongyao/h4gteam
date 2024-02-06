import React from "react";
import { useEffect, useState } from "react";
import db from "../firebase";
import PlaceCard from "../components/place-card";
import "../css/activities-page.css";
import NavBar from "../components/NavBar";
import {
  handleNewEvents,
  handleEditEvents,
  handleDeleteEvents,
  handleQueryDeleteEvents,
} from "../UtilEvents";
import { onSnapshot, collection, addDoc } from "firebase/firestore";

const ActivitiesPage = () => {
  const [events, setEvents] = useState([{ name: "Loading..." }]); // Consider renaming 'event' to 'events' for clarity

  useEffect(() => {
    onSnapshot(collection(db, "EventsTest"), (snapshot) =>
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  return (
    <div>
      <div className="background-image-activities-page">
        <NavBar name="Activities" />
      </div>
      {/* Ensure all PlaceCards are direct children of a single container */}
      <div className="landing-page-cards-container">
        {events.map((event) => (
          <PlaceCard key={event.id} city={event.name} description={event.description} image={event.image} eventPax={event.eventPax}/>
        ))}
      </div>
    </div>
  );
};


export default ActivitiesPage;
