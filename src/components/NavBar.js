// NavBar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isSoftwareOpen, setIsSoftwareOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const closeDropdown = () => {
    setIsSoftwareOpen(false);
  };

  const isHomeActive = currentPath === '/';
  const isReelActive = currentPath === '/reel';
  const isProductionActive = currentPath === '/production';
  const isWritingActive = currentPath === '/writing';
  const isBlogActive = currentPath.startsWith('/blog');
  const isSoftwareActive = ['/resume', '/freelance', '/projects'].includes(currentPath);
  const isClothingActive = currentPath === '/clothing';

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>
          <Link 
            to="/" 
            className={`navbar__link ${isHomeActive ? 'navbar__link--active' : ''}`} 
            onClick={closeDropdown}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/reel" 
            className={`navbar__link ${isReelActive ? 'navbar__link--active' : ''}`} 
            onClick={closeDropdown}
          >
            Video Reel
          </Link>
        </li>
        <li>
          <Link 
            to="/production" 
            className={`navbar__link ${isProductionActive ? 'navbar__link--active' : ''}`} 
            onClick={closeDropdown}
          >
            Production Services
          </Link>
        </li>
        <li>
          <Link 
            to="/writing" 
            className={`navbar__link ${isWritingActive ? 'navbar__link--active' : ''}`} 
            onClick={closeDropdown}
          >
            Writing
          </Link>
        </li>
        <li>
          <Link 
            to="/blog" 
            className={`navbar__link ${isBlogActive ? 'navbar__link--active' : ''}`} 
            onClick={closeDropdown}
          >
            Blog
          </Link>
        </li>
        <li 
          className={`navbar__item--dropdown ${isSoftwareOpen ? 'is-open' : ''}`}
          onMouseEnter={() => setIsSoftwareOpen(true)}
          onMouseLeave={() => setIsSoftwareOpen(false)}
        >
          <button 
            type="button" 
            className={`navbar__link navbar__dropdown-toggle ${isSoftwareActive ? 'navbar__link--active' : ''}`}
            onClick={() => setIsSoftwareOpen(!isSoftwareOpen)}
            aria-expanded={isSoftwareOpen}
          >
            Software Engineering <span className="dropdown-arrow">▾</span>
          </button>
          <div className={`navbar__dropdown ${isSoftwareOpen ? 'navbar__dropdown--open' : ''}`}>
            <Link 
              to="/resume" 
              className={`navbar__link ${currentPath === '/resume' ? 'navbar__link--active' : ''}`} 
              onClick={closeDropdown}
            >
              Experience
            </Link>
            <Link 
              to="/freelance" 
              className={`navbar__link ${currentPath === '/freelance' ? 'navbar__link--active' : ''}`} 
              onClick={closeDropdown}
            >
              Freelance
            </Link>
            <Link 
              to="/projects" 
              className={`navbar__link ${currentPath === '/projects' ? 'navbar__link--active' : ''}`} 
              onClick={closeDropdown}
            >
              Projects
            </Link>
          </div>
        </li>
        <li>
          <Link 
            to="/clothing" 
            className={`navbar__link ${isClothingActive ? 'navbar__link--active' : ''}`} 
            onClick={closeDropdown}
          >
            Clothing
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;