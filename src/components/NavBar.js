// NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isHomeActive = currentPath === '/';
  const isReelActive = currentPath === '/reel';
  const isProductionActive = currentPath === '/production';
  const isWritingActive = currentPath === '/writing';
  const isBlogActive = currentPath.startsWith('/blog');
  const isSoftwareActive = ['/projects', '/freelance'].includes(currentPath);
  const isClothingActive = currentPath === '/clothing';

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>
          <Link 
            to="/" 
            className={`navbar__link ${isHomeActive ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/reel" 
            className={`navbar__link ${isReelActive ? 'navbar__link--active' : ''}`}
          >
            Video Reel
          </Link>
        </li>
        <li>
          <Link 
            to="/production" 
            className={`navbar__link ${isProductionActive ? 'navbar__link--active' : ''}`}
          >
            Production Services
          </Link>
        </li>
        <li>
          <Link 
            to="/writing" 
            className={`navbar__link ${isWritingActive ? 'navbar__link--active' : ''}`}
          >
            Writing
          </Link>
        </li>
        <li>
          <Link 
            to="/blog" 
            className={`navbar__link ${isBlogActive ? 'navbar__link--active' : ''}`}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link 
            to="/projects" 
            className={`navbar__link ${isSoftwareActive ? 'navbar__link--active' : ''}`}
          >
            Software Engineering
          </Link>
        </li>
        <li>
          <Link 
            to="/clothing" 
            className={`navbar__link ${isClothingActive ? 'navbar__link--active' : ''}`}
          >
            Clothing
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;