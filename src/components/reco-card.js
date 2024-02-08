import React from "react";

import PropTypes from "prop-types";
import "./event-card.css";
import { useState } from "react";

const RecoCard = (props) => {
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
      </div>
    </div>
  );
};

RecoCard.defaultProps = {
  image:
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000",
  imageAlt: "image",
  city: "City Name",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
};

RecoCardd.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
};

export default RecoCard;
