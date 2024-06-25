// components/ChickenBroccoliStirFry.js

import React from 'react';

const ChickenBroccoliStirFry = () => {
  return (
    <div className="recipe">
      <h2>Chicken Broccoli Stir Fry</h2>
      <img className="img-fluid" src="images/chicken_broc_stirfry.jpg" alt="Chicken Broccoli Stir Fry" />
      <p>
        Ingredients:
        <br />&bull; 1 1/2 pound chicken breast
        <br />&bull; 5 cloves garlic, minced
        <br />&bull; 1-inch piece peeled fresh ginger, minced
        <br />&bull; 3 cups bite-sized broccoli florets
        <br />&bull; 1 medium onion
        <br />&bull; 1 teaspoon flour
        <br />&bull; 1 cup rice
        <br />&bull; 1 1/2 tablespoon olive oil
        <br />&bull; (optional) 1 tablespoon of sesame seeds
        <br />
        <br />Sauce:
        <br />&bull; 2 tablespoons honey
        <br />&bull; 1/3 cup low-sodium soy sauce
        <br />&bull; 1 tablespoon Siracha (or whatever hot sauce you want to use)
      </p>
      <p className="mb-5">
        Instructions:
        <br />First start with the sauce. Mix together the honey, siracha, and soy sauce in a bowl and set aside.
        ...
        <br />
        Serve the stir fry over rice and sprinkle sesame seeds over the top if you would like.
      </p>
    </div>
  );
};

export default ChickenBroccoliStirFry;
