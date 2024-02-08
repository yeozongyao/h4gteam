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

const Dot = ({ color }) => {
  const style = {
    height: 25,
    width: 25,
    margin: "0px 10px",
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
  };
  return <span style={style}></span>;
};

const LandingPage = () => {
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
              <button className="button2">
                <span>View Our Events</span>
              </button>
              <button className="button3">
                <span>Sign up as a volunteer now!</span>
              </button>
            </div>
          </div>
          <div className="blueheart">
            <img src={blueheart} alt="blueheart" />
          </div>
        </div>
        <div className="partingContainer">
          Here is how you can help! Events recommended for you!!
        </div>
        <div className="similar-events-container">
        <EventSimilarity/>
        </div>

          
        

     
      <div className="landing-page-top-container">
        <div className="landing-page-hero">
          <div className="landing-page-content-container">
            <h1 className="Heading landing-page-text09">Just be good</h1>

            <button className="newbutton" onClick={handleNew}>
              New
            </button>
            <button className="querydeletebutton" onClick={handleQueryDelete}>
              Query Delete
            </button>
            <ul>
              <p>DATABASE ONES</p>
              {colors.map((color) => (
                <li key={color.id}>
                  <button
                    className="editbutton"
                    onClick={() => handleEdit(color.id)}
                  >
                    edit
                  </button>
                  <button
                    className="deletebutton"
                    onClick={() => handleDelete(color.id)}
                  >
                    delete
                  </button>
                  <Dot color={color.value} /> {color.name}
                </li>
              ))}

              <p>HARDCODED ONESSS</p>

              <li>
                <a href="#">edit</a> <Dot color="#f00" /> Red
              </li>
              <li>
                <a href="#">edit</a> <Dot color="#0f0" /> Green
              </li>
              <li>
                <a href="#">edit</a> <Dot color="#00f" /> Blue
              </li>
            </ul>
            <SolidButton button="Explore homes"></SolidButton>
          </div>
        </div>
      </div>
      <div id="main-section" className="landing-page-main">
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

