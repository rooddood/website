import React from 'react';
import './Cooking.css';
import ChickenBroccoliStirFry from './recipes/ChickenBroccoliStirFry';
import PumpkinCheesecake from './recipes/PumpkinCheesecake';
import Cookie from './recipes/Cookie';
import GeorgesReplica from './recipes/GeorgesReplica';
import BiscuitCPP from './recipes/BiscuitCPP';

const Cooking = () => {
  return (
    <div className="cooking">
      <h1>Cooking</h1>
      <h2>I love to cook, and from my Mom I have learned how it can be both a form of meditation and a way to show love. Here are some recipes I have perfected over the years!</h2>
      <div className="recipes">
        <ChickenBroccoliStirFry />
        <PumpkinCheesecake />
        <Cookie />
        {/* <GeorgesReplica />
        <BiscuitCPP /> */}
      </div>
    </div>
  );
};

export default Cooking;
