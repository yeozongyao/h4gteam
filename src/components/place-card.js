import React, { useState } from "react";
import PropTypes from "prop-types";
import "./place-card.css";
import Popup from "./Popup.js";

const PlaceCard = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
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
        <button className="button-40" onClick={() => setButtonPopup(true)}>
          Open Popup
        </button>
        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          eventId={props.eventId}
          eventPax={props.eventPax}
        >
          <h3>{props.city}</h3>
          <p>{props.description}</p>
          <span>Looking for: {props.eventPax} volunteers</span>
        </Popup>
      </div>
    </div>
  );
};

PlaceCard.defaultProps = {
  image:
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000",
  imageAlt: "image",
  city: "City Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
};

PlaceCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
};

export default PlaceCard;
