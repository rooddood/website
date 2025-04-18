// components/ChickenBroccoliStirFry.js

import React from 'react';
import "../Cooking.css"

const ChickenBroccoliStirFry = () => {
  return (
    <>
      <h2>Chicken Broccoli Stir Fry</h2>
      <img src={`${process.env.PUBLIC_URL}/images/chicken_broc_stirfry.jpg`} alt="Chicken Broccoli Stir Fry" />
      <div className="recipe-content">
        <h3>Ingredients</h3>
        <ul>
          <li>1 1/2 pound chicken breast</li>
          <li>5 cloves garlic, minced</li>
          <li>1-inch piece peeled fresh ginger, minced</li>
          <li>1 cups bite-sized broccoli florets</li>
          <li>1 cups carrots</li>
          <li>1 cups multicolored peppers</li>
          <li>1 medium onion</li>
          <li>1 cup rice (per person)</li>
          <li>1 1/2 tablespoon sesame oil</li>
          <li>Salt, Pepper, Garlic powder, Red Pepper Flakes, MSG (shhhhhh)</li>
          <li>(optional) 1 egg</li>
          <li>(optional) 1 tablespoon of sesame seeds</li>
        </ul>
        
        <h3>Sauce</h3>
        <ul>
          <li>2 tablespoons honey</li>
          <li>1/3 cup low-sodium soy sauce</li>
          <li>1 tablespoon Siracha (or whatever hot sauce you want to use)</li>
        </ul>

        <h3>Instructions</h3>
        <ol>
          <li>First make your rice so it is done when you are! Nothing worse than finishing cooking and your rice isn't done. Add some sugar, salt, and vinegar if you want to make it all fancy.</li>
          <li>Dice up all your chicken (or whatever meat you want), or cut it into small strips. Cut up vegetables in different fun shapes, about the same size. Peppers and onions should be long carrots should be circles!</li>
          <li>Make the sauce by mixing together the honey, siracha, and soy sauce in a bowl and set aside.</li>
          <li>Start frying! Use whatever oil you like here, I like to use coconut oil, for extra flavor and high burn point.</li>
          <li>Fry up your garlic and onions first, going slow. Some nice caramelized onions are unbeatable.</li>
          <li>Add your meat. Season it in the pan so as to keep those flavors in there. You can put some salt on it before, but put all the seasonings in the pan.</li>
          <li>Add your veggies. If using a wok, use the sides to get everything all fried up nicely.</li>
          <li>Pour in the sauce and cook for 5-10 minutes until it reduces a bit and coats all the veggies and meat.</li>
          <li>Make a fried egg to put on top if you're feeling naughty.</li>
          <li>Serve the stir fry over rice and sprinkle sesame seeds over the top if you would like. Enjoy!</li>
        </ol>
      </div>
    </>
  );
};

export default ChickenBroccoliStirFry;
