import React from 'react';
import './Clothing.css';

const depopProfilePic = `${process.env.PUBLIC_URL}/images/sniff.jpg`;
const depopLogo = `${process.env.PUBLIC_URL}/images/depop-logo.png`;
const venmoLogo = `${process.env.PUBLIC_URL}/images/venmo-logo.png`;

const Clothing = () => {
  return (
    <div className="clothing">
      <div className="clothing-header">
        <h1>Sniffy's Closet</h1>
        <div className="profile-header">
          <img
            className="profile-picture"
            src={depopProfilePic}
            alt="Profile"
          />
        </div>
        <div className="clothing-intro">
          <p>
            Welcome to Sniffy's Closet! I design, create, and upcycle custom clothing pieces. 
            Everything is sold exclusively on Depop, where you can find unique, one-of-a-kind items. 
            Check out my shop below!
          </p>
        </div>
      </div>

      <div className="links-section">
        <a href="http://depop.com/sniffyscloset" target="_blank" rel="noopener noreferrer" className="link-card depop-card">
          <div className="logo-container">
            <img className="logo" src={depopLogo} alt="Depop Logo" />
          </div>
          <p className="username">@sniffyscloset</p>
        </a>

        <a href="https://venmo.com/Kyle-Rood-2" target="_blank" rel="noopener noreferrer" className="link-card venmo-card">
          <div className="logo-container">
            <img className="logo" src={venmoLogo} alt="Venmo Logo" />
          </div>
          <p className="username">@Kyle-Rood-2</p>
        </a>
      </div>
    </div>
  );
};

export default Clothing;
