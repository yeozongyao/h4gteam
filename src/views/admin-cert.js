import React from 'react'
import EventDiv from '../components/eventDiv'
import NavBar from '../components/NavBar'
import '../css/admin-cert.css'
import { signup, useAuth, logout, login, } from "../firebase";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { onSnapshot, addDoc } from "firebase/firestore";


const AdminCert = () => {
    const currentUser = useAuth();
    const [certificateRequests, setCertificateRequests] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const certificateRequestsRef = collection(db, "CertificateRequests");
        const q = query(certificateRequestsRef, where("approved", "==", false)); // Fetch unapproved requests

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push({ id: doc.id, ...doc.data() });
            });
            setCertificateRequests(requests);
        });

        return () => unsubscribe();
    }, []);

    const approveCertificate = async (requestId) => {
        const db = getFirestore();
        const requestRef = doc(db, "CertificateRequests", requestId);
        await updateDoc(requestRef, {
            approved: true
        });
    };


    return (
        <div className='adminCert-main-div'> 
        <NavBar name="Admin" currentUser={currentUser} />
        <div className='admin-list-of-events'>
            {certificateRequests.length > 0 ? (
                certificateRequests.map(request => (
                    <div key={request.id}>
                        <p>User: {request.userEmail}</p>
                        <p>Event ID: {request.eventId}</p>
                        
                        <button onClick={() => approveCertificate(request.id)}>Approve</button>
                    </div>
                ))
            ) : (
                <p>No certificate requests pending approval.</p>
            )}
        </div>
    </div>
    )
}

export default AdminCert;
/*
import React, { useState, useEffect } from 'react';
import { useAuth } from "../firebase";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import '../css/admin-cert.css';
import CertApprovalComponent from '../components/CertApproval';

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
                const eventsPromises = requestsSnapshot.docs.map(async (docSnapshot) => {
                    const request = { id: docSnapshot.id, ...docSnapshot.data() };
                    const eventRef = doc(db, "EventsTest", request.eventId);
                    console.log(eventRef);
                    const eventSnapshot = await getDoc(eventRef);
                    let eventDetails = {};
                    if (eventSnapshot.exists()) {
                        eventDetails = eventSnapshot.data();
                        console.log(eventDetails);
                        console.log(request);
                    } else {
                        console.log("No such event document!");
                         // or handle the missing event case as appropriate
                    }
                    
                          // Fetch the user details
                    
                    const userRef = doc(db, "User", request.userId); // Assuming 'userId' is the field where you store the user's ID
                    console.log(userRef);
                    const userSnapshot = await getDoc(userRef);
                    let userName = "";
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        userName = `${userData.firstName} ${userData.lastName}`; // Concatenate first name and last name
                    } else {
                        console.log("No such user document!");
                    }
                    return { ...request, eventDetails, userName }; // Include userName in the returned object
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
        <div className='adminCert-main-div'>
            <NavBar name="Admin" currentUser={currentUser} />
            <div className='admin-list-of-events'>
                {requestsAndEvents.length > 0 ? requestsAndEvents.map(({ id, userEmail, eventId, eventDetails, userName }) => (
                    <div key={id}>
                        console.log({userName});
                       
                        <CertApprovalComponent 
                            requestId={id}       
                            userEmail={userEmail}
                            userName={userName}
                            eventId={eventId}
                            eventName={eventDetails?.name} 
                            onApprovalSuccess={handleApprovalSuccess} />
                       
                    </div>
                )) : <p>No certificate requests pending approval.</p>}
            </div>
        </div>
    );
};

export default AdminCert;*/

