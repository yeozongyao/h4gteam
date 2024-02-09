import React from "react";

import PropTypes from "prop-types";

import OutlineButton from "./outline-button";
import "./event-card.css";
import Enrol from "./Enrol.js";
import { useState } from "react";
import { useAuth } from "../firebase";

const EventCard = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const activityName = props.city;
  return (
    <div className="place-card-container">
      <img
        alt={props.imageAlt}
        src={props.image}
        className="place-card-image"
      />
      <div className="place-card-container1">
        <span className="place-card-text">{props.city}</span>
        <span className="place-card-text1">{props.description}</span>
        <span className="place-card-text1">
          Looking for: <span className="place-card-text">{props.eventPax}</span>{" "}
          volunteers
        </span>
        <button className="button-40" 
        disabled={props.eventPax === 0}
        onClick={() => setButtonPopup(true)}>
          {props.eventPax === 0 ? "No more slots" : "Enrol for Event Now"}          
        </button>
        <Enrol
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          eventId={props.eventId}
          eventPax={props.eventPax}
        />
      </div>
    </div>
  );
};

EventCard.defaultProps = {
  
  city: "City Name",
  description:
    "hahaahahaha",
};

EventCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
};

export default EventCard;
