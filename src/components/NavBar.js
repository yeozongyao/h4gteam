import React from "react";
import "./NavBar.css";
import profileIcon from "./profile.png";
import { Colors } from "chart.js";

export default function NavBar({ name, currentUser }) {
  const isAdmin = currentUser?.email === "admin@gmail.com";

  return (
    <div className="landing-page-top-container-navbar-edition">
      <nav data-role="Header" className="landing-page-navbar">
        <h1 className="headerName">{name}</h1>
        <div className="landing-page-right-side">
          <div className="landing-page-links-container">
            {isAdmin && (
              <>
                <a href="/admindashboard" className="landing-page-text">
                  Dashboard
                </a>             
                <a href="/admincert" className="landing-page-text">
                  Admin Cert
                </a>
                <a href="/adminevents" className="landing-page-text">
                  View Events
                </a>
                <a href="/addevents" className="landing-page-text">
                  Add Events
                </a>
                <a href="/signup" className="landing-page-text">
                  Account
                </a>
                <a href="/profiles" className="landing-page-text">
                  <img src={profileIcon} alt="Profile" />
                </a>
              </>
            )}
            {!isAdmin && (
              <>
                <a href="/" className="landing-page-text">
                  Home
                </a>
                <a href="/act" className="landing-page-text">
                  Activities
                </a>
                <a href="/cert" className="landing-page-text">
                  Cert
                </a>
                <a href="/myevents" className="landing-page-text">
                  My Events
                </a>
                <a href="/signup" className="landing-page-text">
                  Account
                </a>
                <a href="/profiles" className="landing-page-text">
                  <img src={profileIcon} alt="Profile" />
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
