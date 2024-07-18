import React from 'react';
import './ImageWithCaption.css';

const ImageWithCaption = ({ src, alt, caption }) => {
  return (
    <div className="image-with-caption">
      <img src={src} alt={alt} className="image" />
      <p className="caption">{caption}</p>
    </div>
  );
};

export default ImageWithCaption;
