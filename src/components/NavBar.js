// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li><Link to="/" className="navbar__link">Home</Link></li>
        <li><Link to="/writing" className="navbar__link">Writing</Link></li>
        <li><Link to="/photography" className="navbar__link">Photography</Link></li>
        {/* <li><Link to="/litvids" className="navbar__link">LitVids</Link></li> */}
        {/* <li><Link to="/resume" className="navbar__link">Resume</Link></li>
        <li><Link to="/meme" className="navbar__link">Meme's Works</Link></li>
        <li><Link to="/clothing" className="navbar__link">Clothing</Link></li>
        <li><Link to="/cooking" className="navbar__link">Cooking</Link></li>
        <li><Link to="/shops" className="navbar__link">Shops</Link></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;