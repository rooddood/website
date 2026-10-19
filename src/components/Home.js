import React, { useState } from 'react';
import './Home.css';

// Dynamically import images from the /images/photography folder
const getImages = () => {
  const context = require.context("../../public/images/photography", false, /\.(jpg|jpeg|png)$/);
  return context.keys().map(context);
};

const Home = () => {
  const images = getImages();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance image every 15 seconds
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 15000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  // Hide scrollbar on mount, restore on unmount
  React.useEffect(() => {
    // Save original style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="home">
      {/* Background Image Carousel */}
      <div
        className="home__background"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="home__overlay"></div>
      </div>

      {/* Navigation Controls */}
      <button className="home__nav-btn home__nav-btn--prev" onClick={goToPrevious} aria-label="Previous Image">
        &#10094;
      </button>
      <button className="home__nav-btn home__nav-btn--next" onClick={goToNext} aria-label="Next Image">
        &#10095;
      </button>

      <header className="home__header">
        <h1>Hi, I'm Kyle Rood</h1>
        <p className="home__tagline">Writer, Producer, Developer.</p>
      </header>

      {/* Pinned Bottom Contact Links */}
      <footer className="home__footer">
        <div className="home__contact">
          <a href="mailto:kylerood16@gmail.com" className="home__contact-link">
            kylerood16@gmail.com
          </a>
          <span className="home__contact-divider">|</span>
          <a href="https://www.linkedin.com/in/kyle-rood/" target="_blank" rel="noopener noreferrer" className="home__contact-link">
            LinkedIn
          </a>
          <span className="home__contact-divider">|</span>
          <a href="https://www.youtube.com/@sniffyscloset" target="_blank" rel="noopener noreferrer" className="home__contact-link">
            YouTube
          </a>
          <span className="home__contact-divider">|</span>
          <a href="https://www.instagram.com/sniffyscloset" target="_blank" rel="noopener noreferrer" className="home__contact-link">
            Instagram
          </a>
          <span className="home__contact-divider">|</span>
          <a 
            href={`${process.env.PUBLIC_URL}/Kyle_Rood_Resume_Whole_2026.pdf`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="home__contact-link"
          >
            Download Resume
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
