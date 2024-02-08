import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from "../firebase";
import UnenrolCard from '../components/unenrol-card';
import "../css/activities-page.css";
import NavBar from "../components/NavBar";
import "../css/my-events.css"; // Ensure this is the correct path to your CSS file
import Footer from "../components/footer";


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
                    console.log("able to retrieve user query");

                    if (!userSnapshot.empty) {
                        const userId = userSnapshot.docs[0].id;
                        const eventsCollectionRef = collection(db, "EventsTest");
                        const eventsQuery = query(eventsCollectionRef, where("enrolledUsers", "array-contains", userId));
                        const eventsSnapshot = await getDocs(eventsQuery);                       
                        console.log("able to retrieve events query");
                        const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        console.log("able to set events data");
                        setMyEvents(eventsData);
                        console.log("able to set my events");
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
            <div className="sometitle">
                <h4>Thank you for enrolling in these events!</h4>
            </div>
            <div className="landing-page-cards-container">
                {myEvents.map(event => (
                    <UnenrolCard eventId={event.id} city={event.name} description={event.description} image={event.image} eventPax={event.eventPax} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default MyEvents;
