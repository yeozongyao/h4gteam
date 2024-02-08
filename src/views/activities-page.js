import React from "react";
import { useEffect, useState } from "react";
import db from "../firebase";
import EventCard from '../components/event-card'
import "../css/activities-page.css";
import NavBar from "../components/NavBar";
import { onSnapshot, collection } from "firebase/firestore";

const ActivitiesPage = () => {
  const [events, setEvents] = useState([{ name: "Loading..." }]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "EventsTest"), (snapshot) =>
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, des: doc.description})))
    );
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="background-image-activities-page">
        <NavBar name="Activities" />
      </div>
      <div className="landing-page-cards-container">
        {events.map((event) => (
          <EventCard eventId={event.id} city={event.name} des={event.des} image={event.image} eventPax={event.eventPax}/>
        
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
