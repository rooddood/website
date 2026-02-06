// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li><Link to="/" className="navbar__link">Home</Link></li>
        <li>
          <span className="navbar__link">Software Engineering</span>
          <div className="navbar__dropdown">
            <Link to="/resume" className="navbar__link">Experience</Link>
            <Link to="/freelance" className="navbar__link">Freelance</Link>
            <Link to="/projects" className="navbar__link">Projects</Link>
          </div>
        </li>
        <li><Link to="/blog" className="navbar__link">Blog</Link></li>
        <li><Link to="/clothing" className="navbar__link">Clothing</Link></li>
        {/* <Link to="/photography" className="navbar__link">Photography</Link> */}
        {/* <Link to="/cooking" className="navbar__link">Cooking</Link> */}
        {/* <Link to="/meme" className="navbar__link">MeMesGoods</Link> */}
      </ul>
    </nav>
  );
};

export default NavBar;