// components/Cookie.js

import React from 'react';
import "../Cooking.css"

const Cookie = () => {
  return (
    <div className="recipe">
      <h2>Cookie</h2>
      <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/pumpkin_cheesecake.jpg`} alt="Pumpkin Cheesecake" />
      <p className="mb-5">
        Ingredients:
        <br />Crust:
        <br />&bull; 1 3/4 cups graham cracker crumbs
        <br />&bull; 3 tablespoons light brown sugar
        <br />&bull; 1/2 teaspoon ground cinnamon
        <br />&bull; ~1 stick melted salted butter
        <br />
        <br />Cake:
        <br />&bull; 3 packages cream cheese, at room temperature
        <br />&bull; 1 (15-ounce) can pureed pumpkin
        <br />&bull; 3 eggs plus 1 egg yolk
        <br />&bull; 1 1/2 cups sugar
        <br />&bull; 1/2 teaspoon ground cinnamon
        <br />&bull; 1/8 teaspoon fresh ground nutmeg
        <br />&bull; 2 tablespoon all-purpose flour
        <br />&bull; 1 teaspoon vanilla extract
        <br />
        <br />Whipped Cream Topping:
        <br />&bull; 2 cups heavy whipping cream
        <br />&bull; 2 tablespoons of sugar
        <br />&bull; 1 teaspoon cinnamon
      </p>
      <p className="mb-5">
        Instructions:
        <br />First start with the crust. Crush up the graham crackers with a food processor, or by putting the crackers
        ...
        <br />
        Once it is cool, simply add the whipped cream topping and enjoy!
      </p>
    </div>
  );
};

export default Cookie;
