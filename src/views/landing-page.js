import React from "react";
import { useEffect, useState } from "react";
import db, { auth, useAuth } from "../firebase";
import { Helmet } from "react-helmet";
import SolidButton from "../components/solid-button";
import PlaceCard from "../components/place-card";
import "../css/landing-page.css";
import NavBar from "../components/NavBar";
import blueheart from '../images/blueheart.png'; // Adjust the path as needed
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import {
  handleNew,
  handleEdit,
  handleDelete,
  handleQueryDelete,
} from "../util";
import EventSimilarity from "../components/EventSimilarity";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();

  const handleSignupLink = () => {
    history.push("/signup");
  }
  
  const handleViewEvents = () => {
    history.push("/act")
  }

  const [colors, setColors] = useState([{ name: "Loading..." }]);
  const currentUser = auth.currentUser; // Get the current user
  useEffect(
    () =>
      onSnapshot(collection(db, "colors"), (snapshot) =>
        setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className="landing-page-container">
      <Helmet>
        <title>Hack4Good</title>
        <meta property="og:title" content="Travel Agency" />
      </Helmet>
      <NavBar name="HackforGood"/>
      <div className="main">
          <div className="hero-section">
            <div className="header">
              <h1 className="difference-heading">You can make a difference</h1>
              <p className="thecaption">
                VOLUNASIA is that moment when you forget you&apos;re
                volunteering to help change lives, because it&apos;s changing
                yours. Come find your volunasia with us!
              </p>
            </div>
            <div className="button1">
              <button className="button2" onClick={handleViewEvents}>
                <span>View Our Events</span>
              </button>
              <button className="button3" onClick={handleSignupLink}>
                <span>Sign up as a volunteer now!</span>
              </button>
            </div>
          </div>
          <div className="blueheart">
            <img src={blueheart} alt="blueheart" />
          </div>

          </div>
       
       
        <div className="parting-container">
          <div className="recommend2">
            <h2>Here is how you can help! Events recommended for you!</h2>
          </div>
        </div>

        <div className="similar-events-container">
        <EventSimilarity/>
        </div>

          
        

     
      <div className="landing-page-top-container">
      </div>
      <div id="main-section" className="landing-page-main">
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

