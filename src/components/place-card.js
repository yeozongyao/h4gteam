import React from "react";

import PropTypes from "prop-types";

import OutlineButton from "./outline-button";
import "./place-card.css";
import Popup from "./Popup.js";
import { useState } from "react";
import CertificateDownloader from "../components/Certdownload";
import enrollInEvent from "../views/enrollInEvent";
import MyForm from "./Form.js";

const PlaceCard = (props) => {
  console.log({ props });

  const [buttonPopup, setButtonPopup] = useState(false);
  const [secondButtonPopup, setSecondButtonPopup] = useState(false);
  const activityName = props.city;
  const handleEnrollClick = async () => {
    try {
      console.log(props.eventId);
      console.log("eventPax:", props.eventPax);
      await enrollInEvent(props.eventId, props.eventPax);
      //props.setTrigger(false);
    } catch (error) {
      console.error("Error enrolling in event:", error);
    }
  };
  const handleRequestCertificateClick = () => {
    if (props.onRequestCertificate) {
        props.onRequestCertificate();
    }
  };
  return (
    <div className="place-card-container">
      <img
        alt={props.imageAlt}
        src={props.image}
        className="place-card-image"
      />
      
        
        <span className="place-card-text">{props.city}</span>
        <span className="place-card-text1">{props.description}</span>
        <span className="place-card-text1">Looking for: <span className="place-card-text">{props.eventPax}</span> volunteers</span>
        {props.isApproved ? (
              <>
                <p>Certificate Approved - Ready for Download</p>
                <div className="download-division">
                <button className='button-40'onClick={() => setButtonPopup(true)}>Download Certificate</button>
                </div>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  {props.displayData}
                  <CertificateDownloader activityName={activityName}/>
                  </Popup>
                  <div className="button-division">
                <button className="feedback-button" onClick={() => setSecondButtonPopup(true)} >Leave a feedback</button>
                </div>
                <Popup trigger={secondButtonPopup} setTrigger={setSecondButtonPopup}>
                  <div>
                    <h1>Hi</h1>
                  </div>
                  </Popup>
                </>
            ) : props.hasRequested ? (
              <div>
                <p>Certificate Request Pending</p>
                <div className="button-division">
                <button className="feedback-button" onClick={() => setSecondButtonPopup(true)}>Leave a feedback</button>
                </div>
              </div>
            ) : (
                <button className='button-40' onClick={handleRequestCertificateClick}>Request Certificate</button>
                
            )}

      
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
  eventPax: PropTypes.string, // Ensure this matches the expected type (string or number?)
  onRequestCertificate: PropTypes.func,
  hasRequested: PropTypes.bool,
  isApproved: PropTypes.bool
};

export default PlaceCard;
