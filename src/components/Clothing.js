import React from 'react';
import './Clothing.css';

const depopProfilePic = `${process.env.PUBLIC_URL}/images/sniff.jpg`;
const depopQRCode = `${process.env.PUBLIC_URL}/images/depop-qr.png`;
const venmoQRCode = `${process.env.PUBLIC_URL}/images/venmo-qr.png`;
const depopLogo = `${process.env.PUBLIC_URL}/images/depop-logo.png`;
const venmoLogo = `${process.env.PUBLIC_URL}/images/venmo-logo.png`;

const Clothing = () => {
  return (
    <div className="clothing">
      <h1>Selling Thrifted Clothes</h1>
      <div className="intro-text">
        <p>
          Welcome! I sell thrifted clothes and unique pieces both online and in person at flea markets. 
          Check out my Depop shop or support me directly via Venmo.
        </p>
      </div>
      <div className="profile-header">
        <img
          className="profile-picture"
          src={depopProfilePic}
          alt="Profile"
        />
      </div>
      <div className="links-section">
        <div className="depop-section">
          <h3>Shop on Depop</h3>
          <p className="username">@sniffyscloset</p>
          <img
            className="qr-code"
            src={depopQRCode}
            alt="Depop QR Code"
          />
          <a href="http://depop.com/sniffyscloset" target="_blank" rel="noopener noreferrer">
            <img
              className="logo"
              src={depopLogo}
              alt="Depop Logo"
            />
          </a>
        </div>
        <div className="venmo-section">
          <h3>Support via Venmo</h3>
          <p>@Kyle-Rood-2</p>
          <img
            className="qr-code"
            src={venmoQRCode}
            alt="Venmo QR Code"
          />
          <a href="https://venmo.com/Kyle-Rood-2" target="_blank" rel="noopener noreferrer">
            <img
              className="logo"
              src={venmoLogo}
              alt="Venmo Logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
