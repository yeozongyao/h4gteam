import React from "react";
import EventDiv from "../components/eventDiv";
import NavBar from "../components/NavBar";
import "../css/admin-events.css";
import {
  handleNewEvents,
  handleEditEvents,
  handleDeleteEvents,
  handleQueryDeleteEvents,
} from "../UtilEvents";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";
import { signup, useAuth, logout, login } from "../firebase";
//import PlaceCard from "../components/place-card";
import AdminEventCard from "../components/adminEventCard";
import Footer from "../components/footer";

const AdminEvents = () => {
  const currentUser = useAuth();

  const [events, setEvents] = useState([{ name: "Loading..." }]); // Consider renaming 'event' to 'events' for clarity

  useEffect(() => {
    onSnapshot(collection(db, "EventsTest"), (snapshot) =>
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  return (
    <>
    <div className="adminCert-main-div">
      <NavBar name="Admin " currentUser={currentUser} />
      <div className="admin-list-of-events">
        {events.map((event) => (
          <AdminEventCard
            eventId={event.id}
            city={event.name}
            description={event.description}
            image={event.image}
            eventPax={event.eventPax}
            enrolledUsersCount={
              event.enrolledUsers ? event.enrolledUsers.length : 0
            } // Add a check for enrolledUsers
          />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AdminEvents;
