import React, { useState } from "react";

import PropTypes from "prop-types";

//import OutlineButton from "./outline-button";
//import { useState } from "react";
import { useAuth } from "../firebase";
//import "./AdminEventCard.css";

const AdminEventCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="admin-event-card">
      <img
        src={props.image}
        alt={props.imageAlt}
        className="admin-event-image"
      />
      <div className="admin-event-info">
        <h3 className="admin-event-title">{props.city}</h3>
        <p className="admin-event-description">{props.description}</p>
        {showDetails && (
          <div className="admin-event-details">
            <p>
              <strong>Event ID:</strong> {props.eventId}
            </p>
            <p>
              <strong>Capacity:</strong> {props.eventPax}
            </p>
            <p>
              <strong>Enrolled Users:</strong> {props.enrolledUsersCount}
            </p>
            {/* Additional event details */}
            <p>
              <strong>Start Date:</strong> {props.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {props.endDate}
            </p>
            {/* Add more event details as needed */}
          </div>
        )}
        <button className="admin-event-details-button" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </div>
  );
};

AdminEventCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
  eventId: PropTypes.string,
  eventPax: PropTypes.number,
  enrolledUsersCount: PropTypes.number,
  startDate: PropTypes.string, // Add PropTypes for start date
  endDate: PropTypes.string, // Add PropTypes for end date
  // Add more PropTypes for additional event details
};

export default AdminEventCard;
