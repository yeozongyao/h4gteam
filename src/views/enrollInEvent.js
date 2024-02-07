import { auth } from "../firebase"; // Assuming correct path to your Firebase configuration file
import {
  doc,
  getFirestore,
  arrayUnion,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  querySnapshot,
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

    // Fetch the event document to get the event description
    const eventDocSnapshot = await getDoc(eventDocRef);
    console.log("event doc here", eventDocSnapshot);
    const eventData = eventDocSnapshot.data();
    const eventDescription = eventData.description;


    // find current profile using email
    const userCollectionRef = collection(db, "User");
    const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
    const userSnapshot = await getDocs(userQuery);;
    const userData = userSnapshot.docs[0].data();
    const querySnapshot = await getDocs(userQuery);
    
    // Uer Document Reference
    const userDocRef = querySnapshot.docs[0].ref;

    // Reference the user document in the "users" collection
    // const userDocRef = doc(db, "User", currentUser.id);
    
    // Concatenate the event description with the existing MLData
    const updatedMLData = userData.MLData ? `${userData.MLData} ${eventDescription}` : eventDescription;

    // Update user profile with the enrolled event description
    await updateDoc(
      userDocRef,
      { MLData: updatedMLData },
    );

    // Decrease eventPax for the event
    await setDoc(eventDocRef, { eventPax: eventPax - 1 }, { merge: true });

    console.log("Enrollment successful");
  } catch (error) {
    console.error("Error enrolling in event:", error);
    // Handle error appropriately, such as displaying a message to the user
  }
};
export default enrollInEvent;
