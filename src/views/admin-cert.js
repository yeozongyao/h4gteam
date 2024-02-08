import React, { useState, useEffect } from 'react';
import { useAuth } from "../firebase";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import '../css/admin-cert.css';
import CertApprovalComponent from '../components/CertApproval';
import Footer from '../components/footer';

const AdminCert = () => {
    const currentUser = useAuth();
    const [requestsAndEvents, setRequestsAndEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequestsAndEvents = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const db = getFirestore();
                const certificateRequestsRef = collection(db, "CertificateRequests");
                const q = query(certificateRequestsRef, where("approved", "==", false));
        
                const requestsSnapshot = await getDocs(q);
                const requestsData = requestsSnapshot.docs.map((docSnapshot) => ({
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                }));
        
                const userPromises = requestsData.map(async (request) => {
                    const userQuery = query(collection(db, "User"), where("email", "==", request.userEmail));
                    const userSnapshot = await getDocs(userQuery);
                    let userId = "";
                    let userName = "";
                    if (!userSnapshot.empty) {
                        userId = userSnapshot.docs[0].id;
                        const userData = userSnapshot.docs[0].data();
                        userName = `${userData.firstName} ${userData.lastName}`;
                    } else {
                        console.log(`No user found with email: ${request.userEmail}`);
                    }
                    return { ...request, userId, userName };
                });
        
                const userData = await Promise.all(userPromises);
        
                const eventsPromises = userData.map(async (request) => {
                    const eventRef = doc(db, "EventsTest", request.eventId);
                    const eventSnapshot = await getDoc(eventRef);
                    let eventDetails = {};
                    if (eventSnapshot.exists()) {
                        eventDetails = eventSnapshot.data();
                    } else {
                        console.log(`No such event document for event ID: ${request.eventId}`);
                    }
                    return { ...request, eventDetails };
                });
        
                const combinedData = await Promise.all(eventsPromises);
                setRequestsAndEvents(combinedData);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };      

        if (currentUser) {
            fetchRequestsAndEvents();
        }
    }, [currentUser]);
    const handleApprovalSuccess = (approvedRequestId) => {
        setRequestsAndEvents((currentRequests) => 
        currentRequests.filter(request => request.id !== approvedRequestId)
    );
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <div className='adminCert-main-div'>
            <NavBar name="Admin" currentUser={currentUser} />       
            <div className='admin-list-of-events'>
                {requestsAndEvents.length > 0 ? requestsAndEvents.map(({ id, userEmail, eventId, eventDetails, userName }) => (
                    <div key={id} className="card-container">
                        <CertApprovalComponent 
                            requestId={id}       
                            userEmail={userEmail}
                            userName={userName}
                            eventId={eventId}
                            eventName={eventDetails?.name} 
                            onApprovalSuccess={handleApprovalSuccess} 
                            imageLink={eventDetails?.image}/>
                       
                    </div>
                )) : <p>No certificate requests pending approval.</p>}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default AdminCert;

