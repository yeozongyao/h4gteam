import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import "../css/profilespage.css"; // Ensure this is the correct path to your CSS file
import NavBar from "../components/NavBar";
import ViewProfilePage from "./viewprofile";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProfilesPage = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    sex: "",
    interests: [],
    availability: "",
    isAdmin: false,
  });

  useEffect(() => {
    const auth = getAuth();

    // Check if the user is authenticated
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, fetch and display existing profile
        fetchExistingProfile(user.email);
      } else {
        // User is not logged in, you can redirect to the login page or handle it as needed
        console.log("User is not logged in");
        // history.push("/login"); // Uncomment and replace with your login route
      }
    });
  }, [history]);
  const fetchExistingProfile = async (email) => {
    const db = getFirestore();

    try {
      const userCollectionRef = collection(db, "User");
      const userQuery = query(userCollectionRef, where("email", "==", email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const existingProfile = userSnapshot.docs[0].data();
        setProfile(existingProfile);
      }
    } catch (error) {
      console.error("Error fetching existing user profile", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: prevProfile[name].includes(value)
          ? prevProfile[name].filter((i) => i !== value)
          : [...prevProfile[name], value],
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleNewUser = async (profile) => {
    const db = getFirestore();

    try {
      const userCollectionRef = collection(db, "User");
      await addDoc(userCollectionRef, profile);
      history.push("/");
      console.log("User profile added to database!");
    } catch (error) {
      console.error("Error adding user", error);
      throw error;
    }
  };

  const handleUpdateUser = async (profile) => {
    const db = getFirestore();

    try {
      const userCollectionRef = collection(db, "User");
      const userQuery = query(
        userCollectionRef,
        where("email", "==", profile.email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userId = userSnapshot.docs[0].id;
        const userDocRef = doc(db, "User", userId);
        await setDoc(userDocRef, profile);
        console.log("User profile updated in database!");
        history.push("/");
      }
    } catch (error) {
      console.error("Error updating user profile", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user already exists in the database
    const userExists = profile.email && (await doesUserExist(profile.email));

    try {
      if (userExists) {
        // If user exists, ask if they want to update the profile
        const confirmUpdate = window.confirm(
          "A profile with this email already exists. Do you want to update the existing profile?"
        );
        if (confirmUpdate) {
          await handleUpdateUser(profile);
        } else {
          console.log("User chose not to update the profile.");
        }
      } else {
        // If user doesn't exist, add a new profile
        await handleNewUser(profile);
      }
    } catch (error) {
      console.error("Error handling user profile:", error);
    }
  };

  const doesUserExist = async (email) => {
    const db = getFirestore();
    const userCollectionRef = collection(db, "User");
    const userQuery = query(userCollectionRef, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    return !userSnapshot.empty;
  };
  return (
    <>
      <NavBar name="Profile" />
      <div className="profile-page-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={profile.age}
              onChange={handleInputChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select
              id="sex"
              name="sex"
              value={profile.sex}
              onChange={handleInputChange}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <fieldset className="form-group">
            <legend>Interests and Skills</legend>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="sports"
                checked={profile.interests.includes("sports")}
                onChange={handleInputChange}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="cooking"
                checked={profile.interests.includes("cooking")}
                onChange={handleInputChange}
              />
              Cooking
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="cleaning"
                checked={profile.interests.includes("cleaning")}
                onChange={handleInputChange}
              />
              Cleaning
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="teaching"
                checked={profile.interests.includes("teaching")}
                onChange={handleInputChange}
              />
              Teaching
            </label>
          </fieldset>
          <div className="form-group">
            <label htmlFor="availability">Availability:</label>
            <input
              type="datetime-local"
              id="availability"
              name="availability"
              value={profile.availability}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Set Up Profile</button>
        </form>
      </div>
    </>
  );
};

export default ProfilesPage;
