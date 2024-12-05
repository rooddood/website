import React, { useState } from "react";
import "./Photography.css";

// Dynamically import images from folder
const getImages = () => {
  const context = require.context(
    "../../public/images/photography",
    false,
    /\.(jpg|jpeg|png)$/
  );
  return context.keys().map(context);
};

const Photography = () => {
  const images = getImages(); // Load images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle navigation
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
    <div className="photography">
      {/* Artist's Statement */}
      <div className="artist-statement">
        <p>
          Photography is my way of capturing the fleeting beauty of the world
          around me. Each image is a story told through light, color, and
          composition.
        </p>
      </div>

      {/* Full-Screen Gallery */}
      <div className="carousel">
        <button className="nav-button prev" onClick={goToPrevious}>
          &#10094;
        </button>
        <div
          className="slide"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        ></div>
        <button className="nav-button next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Photography;
