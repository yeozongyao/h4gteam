// ViewProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import NavBar from "../components/NavBar";

const ViewProfilePage = () => {
  const history = useHistory();
  const { userEmail } = useParams();
  const [existingProfile, setExistingProfile] = useState(null);

  useEffect(() => {
    console.log("Fetching existing profile...");
    fetchExistingProfile(userEmail);
  }, [userEmail]);

  const fetchExistingProfile = async (email) => {
    const db = getFirestore();

    try {
      const userCollectionRef = collection(db, "User");
      const userQuery = query(userCollectionRef, where("email", "==", email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const profileData = userSnapshot.docs[0].data();
        console.log("Existing Profile Data:", profileData);
        setExistingProfile(profileData);
      } else {
        console.log("No data found for the given email.");
      }
    } catch (error) {
      console.error("Error fetching existing user profile", error);
    }
  };

  const handleUpdateProfile = () => {
    history.push(`/profiles?email=${userEmail}`);
  };

  return (
    <>
      <NavBar />
      <div className="profile-page-container">
        <h2>Existing Profile</h2>
        {existingProfile ? (
          <>
            <div>
              <strong>First Name:</strong> {existingProfile.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {existingProfile.lastName}
            </div>
            <div>
              <strong>Email:</strong> {existingProfile.email}
            </div>
            {/* Add similar sections for other profile attributes */}
            <div>
              <strong>Availability:</strong> {existingProfile.availability}
            </div>
            <button onClick={handleUpdateProfile}>Update Profile</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ViewProfilePage;
