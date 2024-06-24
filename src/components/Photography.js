import React from 'react';
import './Photography.css';

const Photography = () => {
  return (
    <div className="photography">
      <h1>Photography</h1>
      <div className="gallery">
        <img src="photo1.jpg" alt="Photo 1" />
        <img src="photo2.jpg" alt="Photo 2" />
        <img src="photo3.jpg" alt="Photo 3" />
      </div>
    </div>
  );
};

export default Photography;
