// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li><Link to="/" className="navbar__link">Home</Link></li>
        {/* <li><Link to="/resume" className="navbar__link">Resume</Link></li>
        <li><Link to="/photography" className="navbar__link">Photography</Link></li>
        <li><Link to="/clothing" className="navbar__link">Clothing</Link></li>
        <li><Link to="/cooking" className="navbar__link">Cooking</Link></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;