import React from 'react';
import './Cooking.css';
import ChickenBroccoliStirFry from './ChickenBroccoliStirFry';
import PumpkinCheesecake from './PumpkinCheesecake';

const Cooking = () => {
  return (
    <div className="cooking">
      <h1>Cooking</h1>
      <div className="recipes">
        <ChickenBroccoliStirFry />
        <PumpkinCheesecake />
        {/* Add more recipe components as needed */}
      </div>
    </div>
  );
};

export default Cooking;
