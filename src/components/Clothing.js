import React from 'react';
import './Clothing.css';

const Clothing = () => {
  return (
    <div className="clothing">
      <h1>Clothing</h1>
      <div className="clothing-list">
        <div className="clothing-item">
          <h2>Item 1</h2>
          <p>Description of clothing item 1.</p>
        </div>
        <div className="clothing-item">
          <h2>Item 2</h2>
          <p>Description of clothing item 2.</p>
        </div>
        <div className="clothing-item">
          <h2>Item 3</h2>
          <p>Description of clothing item 3.</p>
        </div>
      </div>
    </div>
  );
};

export default Clothing;
