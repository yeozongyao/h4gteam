import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from "../firebase";
import UnenrolCard from '../components/unenrol-card';
import "../css/activities-page.css";
import NavBar from "../components/NavBar";
import "../css/my-events.css"; // Ensure this is the correct path to your CSS file
import PlaceCard from '../components/place-card'
import { onSnapshot, addDoc } from "firebase/firestore";
import Footer from "../components/footer";


const CertPage = () => {
    const currentUser = useAuth();
    const [myEvents, setMyEvents] = useState([]);
    const [userCertificateRequests, setUserCertificateRequests] = useState({});

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

        const fetchCertificateRequests = async () => {
          if (currentUser && currentUser.uid) {
              const db = getFirestore();
              const requestsCollectionRef = collection(db, "CertificateRequests");
              const requestsQuery = query(requestsCollectionRef, where("userId", "==", currentUser.uid));
              const requestsSnapshot = await getDocs(requestsQuery);
              
              // Process the requests and set the state
              const requests = {};
              requestsSnapshot.forEach((doc) => {
                  const requestData = doc.data();
                  requests[requestData.eventId] = { ...requestData, id: doc.id };
              });
              setUserCertificateRequests(requests);
          }
      };

      fetchCertificateRequests();
    }, [currentUser]);

    const requestCertificate = async (eventId) => {
      const db = getFirestore();
      const certificateRequestsRef = collection(db, "CertificateRequests");
      const newRequestRef = await addDoc(certificateRequestsRef, {
          userId: currentUser.uid,
          eventId: eventId,
          approved: false, // default approval status is false
          userEmail: currentUser.email
      });
      
      // Update the local state to include the new request
      console.log('Before update:', userCertificateRequests);
      setUserCertificateRequests(prevRequests => ({
          ...prevRequests,
          [eventId]: {
              userId: currentUser.uid,
              eventId: eventId,
              approved: false,
              id: newRequestRef.id,
              userEmail: currentUser.email,
          }
      }));
    };
  
    return (
        <div>
            <NavBar name="Certificates" />
            <div className="sometitle">
                <h4>Thanks for volunteering! Here's an official certificate for your contributions!</h4>
            </div>
            <div className="landing-page-cards-container">
            {myEvents.map(event => {
                const request = userCertificateRequests[event.id];
                const hasRequested = request !== undefined; // true if a request object is found
                const isApproved = hasRequested && request.approved; // true if the request is approved
                console.log(`Event ID: ${event.id}, Has Requested: ${hasRequested}, Is Approved: ${isApproved}`);
                return (
                    <PlaceCard
                        key={event.id}
                        city={event.name}
                        description={event.description}
                        image={event.image}
                        eventPax={event.eventPax}
                        onRequestCertificate={() => requestCertificate(event.id)}
                        hasRequested={hasRequested}
                        isApproved={isApproved}
                    />
                );
            })} 
            </div>
            <Footer />
        </div>
    );
};

export default CertPage;

