// components/Cookie.js

import React from 'react';
import "../Cooking.css"

const Cookie = () => {
  return (
    <div className="recipe">
      <h2>Cookie</h2>
      <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/cookie.jpg`} alt="Cookie" />
      <p className="mb-5">
        Ingredients:
        <br />&bull; 1 cup (2 stick) butter
        <br />&bull; 3/4 cup brown sugar
        <br />&bull; 3/4 cup brown sugar
        <br />&bull; 1 cup oats
        <br />&bull; 1 cup crushed nuts (walnuts/pecans usually, but and can be any) butter
        <br />&bull; 1+ teaspoon vanilla
        <br />&bull; 1 teaspoon baking soda
        <br />&bull; 1/2 tsp teaspoon baking powder
        <br />&bull; 1-2 cups semi sweet chips / chunks (chop up 60%+ cacao bar for half)
        <br />&bull; (optional) lemon juice splash
        <br />&bull; (optional) 1 cup cranberry for fall vibe!
        <br />&bull; 1 teaspoon vanilla
      </p>
      <p className="mb-5">
        Instructions:
        <br />
        The main key here is browning the butter. Brown your butter folks! It gives a deep carmel taste to your cookies it is amazing.
        Put your butter in a small pan, and melt the butter, letting it keep cooking in teh pan until it is golden brown, with some of the fat on the bottom of the pan. 
        Stir every once in a while, then when golden brown, take off heat, and let cool almost all of the way (the warmth helps softwen the cream cheese, but can curdle it)
        Mix your butter, sugar, and salt.
        Then the oats, vanilla, baking soda/powder, and nuts.
        The slowly add flour until the dough starts to form together (need to be able to form doughballs).
        Add in chocolate chips/chunks. I like to chop up a nice dark chocolate to add in addition to semi sweet chips.
        Let sit at least one hour in the frdge, better in the freezer overnight.
        Make 1 inch balls and bake for around 10 minutes at 350. Take the tray out and tap it on the counter to make them bake flatter
      </p>
    </div>
  );
};

export default Cookie;
