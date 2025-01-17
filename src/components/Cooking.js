import React from 'react';
import './Cooking.css';
import ChickenBroccoliStirFry from './ChickenBroccoliStirFry';
import PumpkinCheesecake from './PumpkinCheesecake';

const Cooking = () => {
  return (
    <div className="cooking">
      <h1>Cooking</h1>
      <h2>I love to cook, and from my Mom I have learned how it can be both a form of meditation and a way to show love. Here are some recipes I have perfected over the years!</h2>
      <div className="recipes">
        <ChickenBroccoliStirFry />
        <PumpkinCheesecake />
        {/* Add more recipe components as needed */}
      </div>
    </div>
  );
};

export default Cooking;
