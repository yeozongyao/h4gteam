import React from "react";

import "./Popup.css";
import { useState } from "react";

import PropTypes from "prop-types";
import enrollInEvent from "../views/enrollInEvent"; // Import the enrollInEvent function

function Popup(props) {
  const handleEnrollClick = async () => {
    try {
      // Call enrollInEvent function with eventId and eventPax
      console.log(props.eventId);
      console.log("eventPax:", props.eventPax); // Add this logging statement
      await enrollInEvent(props.eventId, props.eventPax);
      // After successful enrollment, close the popup
      props.setTrigger(false);
    } catch (error) {
      console.error("Error enrolling in event:", error);
      // Handle error appropriately, such as displaying a message to the user
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

Popup.propTypes = {
  trigger: PropTypes.bool.isRequired,
  setTrigger: PropTypes.func.isRequired,
  eventId: PropTypes.string, // Add prop type validation for eventId
  //   eventPax: PropTypes.number.isRequired, // Add prop type validation for eventPax
};

export default Popup;
