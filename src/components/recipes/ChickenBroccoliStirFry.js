// components/ChickenBroccoliStirFry.js

import React from 'react';
import "../Cooking.css"

const ChickenBroccoliStirFry = () => {
  return (
    <div className="recipe">
      <h2>Chicken Broccoli Stir Fry</h2>
      <img className="img" src={`${process.env.PUBLIC_URL}/images/chicken_broc_stirfry.jpg`} alt="Chicken Broccoli Stir Fry" />
      <p>
        Ingredients:
        <br />&bull; 1 1/2 pound chicken breast
        <br />&bull; 5 cloves garlic, minced
        <br />&bull; 1-inch piece peeled fresh ginger, minced
        <br />&bull; 1 cups bite-sized broccoli florets
        <br />&bull; 1 cups carrots
        <br />&bull; 1 cups multicolored peppers
        <br />&bull; 1 medium onion
        <br />&bull; 1 cup rice (per person)
        <br />&bull; 1 1/2 tablespoon sesame oil
        <br />&bull; Salt, Pepper, Garlic powder, Red Pepper Flakes, MSG (shhhhhh)
        <br />&bull; (optional) 1 egg
        <br />&bull; (optional) 1 tablespoon of sesame seeds
        <br />
        <br />Sauce:
        <br />&bull; 2 tablespoons honey
        <br />&bull; 1/3 cup low-sodium soy sauce
        <br />&bull; 1 tablespoon Siracha (or whatever hot sauce you want to use)
      </p>
      <p className="mb-5">
        Instructions:
        <br />First make your rice so it is done when you are! Nothing worse than finishing cooking and your rice isn't done. Add some sugar, salt, and vinegar if you want to make it all fancy. 
        Dice up all your chicken (or whatever meat you want), or cut it into small strips. Cut up vegetables in different fun shapes, about teh same size. Peppers and onions should be long carrots should be circles! Pick your poison its fun
        Then make the sauce. Mix together the honey, siracha, and soy sauce in a bowl and set aside.
        Next up lets start frying! Use whatever oil you like here, I like to use coconut oil, for extra flavor and high burn point.
        Fry up your garlic and onions first, going slow. Some nice carmelized onions are unbeatable.
        Then your meat. Season it in the pan so as to keep those flavors in there. You can put some salt on it before, but put all the seasonings in the pan.
        Next your veggies. If using a wok, use the sides to get everything all fried up all nicely
        Pour in the sauce and cook for 5-10 minuites until it reduces a bit and coats all the veggies and mats.
        Make a fried egg to put on top if u feelin naughty.

        Serve the stir fry over rice and sprinkle sesame seeds over the top if you would like. enjoy.
        Fin.
      </p>
    </div>
  );
};

export default ChickenBroccoliStirFry;
