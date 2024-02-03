// ProfilesPage.jsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, addDoc, doc, setDoc, query, where, getDocs, getFirestore } from 'firebase/firestore';
import '../css/profilespage.css'; // Ensure this is the correct path to your CSS file
import NavBar from '../components/NavBar';

const ProfilesPage = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    sex: '',
    interests: [],
    availability: ''
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      // For handling checkboxes (interests)
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: prevProfile[name].includes(value)
          ? prevProfile[name].filter(i => i !== value)
          : [...prevProfile[name], value]
      }));
    } else {
      // For handling other inputs
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  const handleNewUser = async (profile) => {
    const db = getFirestore();

    try {
      const userCollectionRef = collection(db, "User");
      await addDoc(userCollectionRef, profile);
      history.push('/');
      console.log('User profile added to database!');

    } catch (error) {
      console.error('Error adding user', error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleNewUser(profile);
      console.log('User profile succesfully added!');
    } catch (error) {
      console.error('Error adding user profile: ', error);

    }
    // Handle form submission logic here
    // This is where you would connect to Firebase or another database
  };

  return (
    <>
      <NavBar />
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
                checked={profile.interests.includes('sports')}
                onChange={handleInputChange}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="cooking"
                checked={profile.interests.includes('cooking')}
                onChange={handleInputChange}
              />
              Cooking
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="cleaning"
                checked={profile.interests.includes('cleaning')}
                onChange={handleInputChange}
              />
              Cleaning
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="teaching"
                checked={profile.interests.includes('teaching')}
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
