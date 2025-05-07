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
            {/* <Link to="/resume" className="navbar__link">Resume</Link> */}
            <Link to="/freelance" className="navbar__link">Freelance</Link>
            <Link to="/projects" className="navbar__link">Projects</Link>
          </div>
        </li>
        <li>
          <span className="navbar__link">Creative</span>
          <div className="navbar__dropdown">
            <Link to="/photography" className="navbar__link">Photography</Link>
            <Link to="/cooking" className="navbar__link">Cooking</Link>
            <Link to="/clothing" className="navbar__link">Clothing</Link>
            <Link to="/meme" className="navbar__link">MeMesGoods</Link>
            {/* Uncomment when blogs are posted  */}
            {/* <Link to="/blog" className="navbar__link">Blog</Link> */}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;