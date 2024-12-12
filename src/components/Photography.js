import React, { useState } from "react";
import "./Photography.css";

// Dynamically import images from the /images/photography folder
const getImages = () => {
  const context = require.context("../../public/images/photography", false, /\.(jpg|jpeg|png)$/);
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
      {/* Title Box */}
      <div className="title-box">
        <p>My Photography</p>
      </div>

      {/* Image Carousel */}
      <div
        className="image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <button className="nav-button prev" onClick={goToPrevious}>
          &#10094;
        </button>
        <button className="nav-button next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Photography;
