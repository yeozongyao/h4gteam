import { auth } from "../firebase"; // Assuming correct path to your Firebase configuration file
import {
  doc,
  getFirestore,
  arrayUnion,
  setDoc,
  updateDoc,
} from "firebase/firestore"; // Import specific functions from Firestore

const db = getFirestore(); // Initialize Firestore

const enrollInEvent = async (eventId, eventPax) => {
  try {
    const currentUser = auth.currentUser; // Get the current user

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Reference the user document in the "users" collection
    console.log(currentUser.uid);
    // const userDocRef = doc(db, "users", currentUser.uid);

    // // Update user profile with the enrolled event
    // await updateDoc(
    //   userDocRef,
    //   { enrolledEvents: arrayUnion(eventId) },
    //   { merge: true }
    // );

    // Reference the event document in the "EventsTest" collection
    const eventDocRef = doc(db, "EventsTest", eventId);

    // Decrease eventPax for the event
    await setDoc(eventDocRef, { eventPax: eventPax - 1 }, { merge: true });

    console.log("Enrollment successful");
  } catch (error) {
    console.error("Error enrolling in event:", error);
    // Handle error appropriately, such as displaying a message to the user
  }
};
export default enrollInEvent;
