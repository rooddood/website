import React from 'react';
import './Clothing.css';

const depopProfilePic = './images/sniff.jpg'; // Adjust path as needed

const Clothing = () => {
  return (
    <div className="clothing">
      <h2>Explore Unique Pieces</h2>
      <div className="intro-text">
        <p>Welcome to my showcase of big ticket items and custom creations.</p>
        <p>Click below to browse more items on my Depop shop.</p>
      </div>
      <div className="profile-header">
        <img
          className="profile-picture"
          src={depopProfilePic}
          alt="Depop Profile"
        />
        <h1 className="profile-username">@sniffyscloset</h1>
      </div>
      <div className="depop-link">
        <a href="http://depop.com/sniffyscloset" target="_blank" rel="noopener noreferrer">
          Explore More on Depop
        </a>
      </div>
      <div className="custom-work">
        <h3>Custom Work</h3>
        <div className="custom-item">
          <h4>Custom Item 1</h4>
          <p>Description of custom item 1.</p>
        </div>
        <div className="custom-item">
          <h4>Custom Item 2</h4>
          <p>Description of custom item 2.</p>
        </div>
      </div>
      <div className="big-ticket-items">
        <h3>Big Ticket Items</h3>
        <div className="big-ticket-item">
          <h4>Big Ticket Item 1</h4>
          <p>Description of big ticket item 1.</p>
        </div>
        <div className="big-ticket-item">
          <h4>Big Ticket Item 2</h4>
          <p>Description of big ticket item 2.</p>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
