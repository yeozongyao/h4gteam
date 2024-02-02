import React from 'react';
import './NavBar.css'; 

export default function NavBar() {

    return (
        <div className="landing-page-top-container">
        <nav data-role="Header" className="landing-page-navbar">
          <h1>Travel</h1>
          <div className="landing-page-right-side">
            <div className="landing-page-links-container">
              <span className="landing-page-text">Gene</span>
              <span className="landing-page-text01">About</span>
              <span className="landing-page-text02">Tour Packages</span>
              <span className="landing-page-text03">Contact</span>
            </div>
            <a href="#main-section" className="landing-page-link">
              Explore 
            </a>
          </div>
          </nav>
        </div>
        
    )

}