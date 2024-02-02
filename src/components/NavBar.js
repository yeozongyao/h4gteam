import React from 'react';
import './NavBar.css'; 

export default function NavBar({name}) {

    return (
        <div className="landing-page-top-container-navbar-edition">
        <nav data-role="Header" className="landing-page-navbar">
          <h1>{name}</h1>
          <div className="landing-page-right-side">
            <div className="landing-page-links-container">
              <a href="/" className="landing-page-text">
              Home
            </a>
            <a href="/act" className="landing-page-text">
              Activities
            </a>
            <a href="/cert" className="landing-page-text">
              Cert
            </a>
            <a href="/admincert" className="landing-page-text">
              Admin Cert
            </a>
            </div>
          </div>
          </nav>
        </div>
        
    )

}
