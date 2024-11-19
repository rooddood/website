import React from 'react';
import Slider from 'react-slick';
import './Photography.css';

// Dynamically import images from folder
const getImages = () => {
  const context = require.context('../../public/images/photography', false, /\.(jpg|jpeg|png)$/);
  return context.keys().map(context);
};

const Photography = () => {
  const images = getImages(); // Get the list of images

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
  };

  return (
    <div className="photography">
      <h1>Photography</h1>

      {/* Artist's Statement */}
      <div className="artist-statement">
        <p>
          Photography is my way of capturing the fleeting beauty of the world around me. 
          Each image is a story told through light, color, and composition. Whether I'm 
          exploring urban landscapes or serene natural vistas, my goal is to preserve 
          moments that evoke emotion and spark imagination.
        </p>
      </div>

      {/* Scrolling Gallery */}
      <div className="scrolling-gallery">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={image} alt={`Gallery Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Photography;
