import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from "../firebase";
import EventCard from '../components/event-card';
import "../css/activities-page.css";
import NavBar from "../components/NavBar";

const MyEvents = () => {
    const currentUser = useAuth();
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        const fetchMyEvents = async () => {
            if (currentUser && currentUser.email) {
                try {
                    const db = getFirestore();
                    const userCollectionRef = collection(db, "User");
                    const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
                    const userSnapshot = await getDocs(userQuery);

                    if (!userSnapshot.empty) {
                        const enrolledEvents = userSnapshot.docs[0].enrolledEvents;
                        console.log("can here");

                        // Iterate over enrolledEvents to fetch event data for each event ID

                         const eventsData = await Promise.all(enrolledEvents.map(async eventId => {
                            const eventDoc = await getDoc(doc(db, "EventsTest", eventId));
                            return eventDoc.exists() ? { id: eventDoc.id, ...eventDoc.data() } : null;
                        }));

             
                        setMyEvents(filteredEventsData);
                    } else {
                        console.error("User document not found for email:", currentUser.email);
                    }
                } catch (error) {
                    console.error("Error fetching user's enrolled events:", error);
                }
            }
        };

        fetchMyEvents();
    }, [currentUser]);

    return (
        <div>
            <NavBar name="My Events" />
            <div className="landing-page-cards-container">
                {myEvents.map(event => (
                    <EventCard eventId={event.id} city={event.name} description={event.description} image={event.image} eventPax={event.eventPax} />
                ))}
            </div>
        </div>
    );
};

export default MyEvents;
