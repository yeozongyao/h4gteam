import React from "react";
import { useEffect, useState } from "react";
import "./Enrol.css";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore"; // Import Firestore update functions
import { useAuth } from "../firebase";

import PropTypes from "prop-types";

function Enrol(props) {
  const currentUser = useAuth();
  const db = getFirestore();

  const handleEnrolment = async () => {
    // Check if currentUser is null to avoid errors
    if (currentUser && currentUser.email) {
      const db = getFirestore();
      const userCollectionRef = collection(db, "User");
      const userQuery = query(
        userCollectionRef,
        where("email", "==", currentUser.email)
      );

      try {
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userId = userSnapshot.docs[0].id;

          // Update the user document to add the event ID to the enrolledEvents array
          await updateDoc(doc(db, "User", userId), {
            enrolledEvents: [
              ...(userSnapshot.docs[0].data().enrolledEvents || []),
              props.eventId,
            ],
          });
          console.log("can add events to user");

          // Add the user ID to the event document in the Events collection
          await updateDoc(doc(db, "EventsTest", props.eventId), {
            enrolledUsers: [
              ...(userSnapshot.docs[0].data().enrolledUsers || []),
              userId,
            ],
          });
          console.log("can add user to event");

          // Combine MLData using Event Description
          // const updatedMLData = userData.MLData ? `${userData.MLData} ${eventDescription}` : eventDescription;

          // Update user profile ML Data with the enrolled event description
          // await updateDoc(
          //   userDocRef,
          //   { MLData: updatedMLData },
          // );

          // Close the popup after enrolment
          props.setTrigger(false);

          const eventDocRef = doc(db, "EventsTest", props.eventId);
          const eventPax = props.eventPax;
          await setDoc(
            eventDocRef,
            { eventPax: eventPax - 1 },
            { merge: true }
          );

          alert("Successfully addded");
        }
      } catch (error) {
        console.error("Error updating", error);
      }
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="button-container">
          {}
          <button onClick={handleEnrolment}>Confirm Enrolment</button>
          <button onClick={() => props.setTrigger(false)}>X</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
export default Enrol;
