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
        <div className='adminCert-main-div'> {/* This is the parent JSX element */}
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

export default AdminCert