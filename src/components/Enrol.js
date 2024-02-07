import React from 'react'
import { useEffect, useState } from "react";
import './Enrol.css'; 
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { updateDoc, doc } from "firebase/firestore"; // Import Firestore update functions
import { useAuth } from "../firebase";

import PropTypes from 'prop-types';

function Enrol(props) {
    const currentUser = useAuth();
    const db = getFirestore();
    
    const handleEnrolment = async () => {
        // Check if currentUser is null to avoid errors      
        if (currentUser && currentUser.email) {
            const db = getFirestore();
            const userCollectionRef = collection(db, "User");
            const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
        
            try {
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    const userId = userSnapshot.docs[0].id;
    
                    // Update the user document to add the event ID to the enrolledEvents array
                    await updateDoc(doc(db, "User", userId), {
                        enrolledEvents: [...(userSnapshot.docs[0].data().enrolledEvents || []), props.eventId]
                    });
                    // Close the popup after enrolment
                    props.setTrigger(false);
                    
                }
            } catch (error) {
                console.error("Error updating", error);
                }
            } 
        
    };

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='button-container'>
                    {}
                    <button onClick={handleEnrolment}>
                        Confirm Enrolment
                    </button>
                    <button onClick={() => props.setTrigger(false)}>
                        X
                    </button>
                    
                </div>
            </div>
        </div>
    ): "";
}
export default Enrol