import React from "react";
import { useEffect, useState } from "react";
import "./Unenrol.css";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayRemove,
  setDoc
} from "firebase/firestore";
import { useAuth } from "../firebase";

import PropTypes from "prop-types";

function Unenrol(props) {
  const currentUser = useAuth();
  const db = getFirestore();

  const handleUnenrolment = async () => {
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
          const userData = userSnapshot.docs[0].data();
          console.log("userData:", userData);

          console.log(props.eventId);

          // Check if the user is enrolled in the event
          if (
            userData.enrolledEvents &&
            userData.enrolledEvents.includes(props.eventId)
          ) {
            console.log("User is enrolled in the event");
            // Remove the event ID from the user's enrolledEvents array
            const updatedEnrolledEvents = userData.enrolledEvents.filter(
              (event) => event !== props.eventId
            );
            console.log("remove");
            await updateDoc(doc(db, "User", userId), {
              enrolledEvents: updatedEnrolledEvents,
            });
            console.log("removed event from user");

            // Remove the user ID from the event's enrolledUsers array
            const eventDocRef = doc(db, "EventsTest", props.eventId);
            await updateDoc(eventDocRef, {
            enrolledUsers: arrayRemove(userId),
            });
            console.log("removed user from event");



            // const eventSnapshot = await getDocs(eventQuery);
            // if (!eventSnapshot.empty) {
            //   const eventData = eventSnapshot.docs[0].data();
            //   const updatedEnrolledUsers = eventData.enrolledUsers.filter(
            //     (uid) => uid !== userId
            //   );
            //   await updateDoc(doc(db, "EventsTest", props.eventId), {
            //     enrolledUsers: updatedEnrolledUsers,

            //  });
              console.log("removed user from event");

              const eventPax = props.eventPax;
                await setDoc(
                    eventDocRef,
                    { eventPax: eventPax + 1 },
                    { merge: true }
                );

         

              // Close the popup after unenrolment
              props.setTrigger(false);

              alert("Aw :( You have succesfully unenrolled from the event!");
            }
          } else {
            alert("You are not enrolled in this event.");
          }
        }
       catch (error) {
        console.error("Error unenrolling", error);
      }
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="button-container">
          <button onClick={handleUnenrolment}>Confirm Unenrolment</button>
          <button onClick={() => props.setTrigger(false)}>X</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Unenrol;
