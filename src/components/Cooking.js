import React, { useState } from 'react';
import './Cooking.css';
import Recipe from './Recipe';

const recipes = [
  {
    id: 'chicken-broccoli',
    title: 'Chicken Broccoli Stir Fry',
    image: 'chicken_broc_stirfry.jpg',
    ingredients: [
      '1 1/2 pound chicken breast',
      '5 cloves garlic, minced',
      '1-inch piece peeled fresh ginger, minced',
      '1 cups bite-sized broccoli florets',
      '1 cups carrots',
      '1 cups multicolored peppers',
      '1 medium onion',
      '1 cup rice (per person)',
      '1 1/2 tablespoon sesame oil',
      'Salt, Pepper, Garlic powder, Red Pepper Flakes, MSG (shhhhhh)',
      '(optional) 1 egg',
      '(optional) 1 tablespoon of sesame seeds'
    ],
    sauce: [
      '2 tablespoons honey',
      '1/3 cup low-sodium soy sauce',
      '1 tablespoon Siracha (or whatever hot sauce you want to use)'
    ],
    instructions: [
      'First make your rice so it is done when you are! Nothing worse than finishing cooking and your rice isn\'t done. Add some sugar, salt, and vinegar if you want to make it all fancy.',
      'Dice up all your chicken (or whatever meat you want), or cut it into small strips. Cut up vegetables in different fun shapes, about the same size. Peppers and onions should be long carrots should be circles!',
      'Make the sauce by mixing together the honey, siracha, and soy sauce in a bowl and set aside.',
      'Start frying! Use whatever oil you like here, I like to use coconut oil, for extra flavor and high burn point.',
      'Fry up your garlic and onions first, going slow. Some nice caramelized onions are unbeatable.',
      'Add your meat. Season it in the pan so as to keep those flavors in there. You can put some salt on it before, but put all the seasonings in the pan.',
      'Add your veggies. If using a wok, use the sides to get everything all fried up nicely.',
      'Pour in the sauce and cook for 5-10 minutes until it reduces a bit and coats all the veggies and meat.',
      'Make a fried egg to put on top if you\'re feeling naughty.',
      'Serve the stir fry over rice and sprinkle sesame seeds over the top if you would like. Enjoy!'
    ]
  },
  {
    id: 'pumpkin-cheesecake',
    title: 'Pumpkin Cheesecake',
    image: 'pumpkin_cheesecake.jpg',
    ingredients: [
      'Crust:',
      '1 3/4 cups graham cracker crumbs',
      '3 tablespoons light brown sugar',
      '1/2 teaspoon ground cinnamon',
      '~1 stick melted salted butter',
      '',
      'Cake:',
      '3 packages cream cheese, at room temperature',
      '1 (15-ounce) can pureed pumpkin',
      '3 eggs plus 1 egg yolk',
      '1 1/2 cups sugar',
      '1/2 teaspoon ground cinnamon',
      '1/8 teaspoon fresh ground nutmeg',
      '2 tablespoon all-purpose flour',
      '1 teaspoon vanilla extract',
      '',
      'Whipped Cream Topping:',
      '2 cups heavy whipping cream',
      '2 tablespoons of sugar',
      '1 teaspoon cinnamon'
    ],
    instructions: [
      'First start with the crust. Crush up the graham crackers with a food processor, or by putting the crackers in a ziploc and smashing them with your fists.',
      'Melt a stick of butter and add to crumbs in a bowl. Sprinkle some cinnamon in there cuz u nasty.',
      'Mix it all then press the crust into the bottom of a greased 13x9 glass pan, or a springform pan if ur fancy.',
      'Then mix your cake ingredients together. Makes it easier to use a hand mixer, and leave the cream cheese out for an hour to help soften it up.',
      'Taste the cake to make sure it tastes right, sometimes needs more spices.',
      'Whip that cream!',
      'Once it is cool, simply add the whipped cream topping and enjoy!'
    ]
  },
  {
    id: 'cookie',
    title: 'Cookie',
    image: 'cookie.jpg',
    ingredients: [
      '1 cup (2 stick) butter',
      '3/4 cup brown sugar',
      '3/4 cup brown sugar',
      '1 cup oats',
      '1 cup crushed nuts (walnuts/pecans usually, but and can be any) butter',
      '1+ teaspoon vanilla',
      '1 teaspoon baking soda',
      '1/2 tsp teaspoon baking powder',
      '1-2 cups semi sweet chips / chunks (chop up 60%+ cacao bar for half)',
      '(optional) lemon juice splash',
      '(optional) 1 cup cranberry for fall vibe!',
      '1 teaspoon vanilla'
    ],
    instructions: [
      'The main key here is browning the butter. Brown your butter folks! It gives a deep carmel taste to your cookies it is amazing.',
      'Put your butter in a small pan, and melt the butter, letting it keep cooking in teh pan until it is golden brown, with some of the fat on the bottom of the pan.',
      'Stir every once in a while, then when golden brown, take off heat, and let cool almost all of the way (the warmth helps softwen the cream cheese, but can curdle it)',
      'Mix your butter, sugar, and salt.',
      'Then the oats, vanilla, baking soda/powder, and nuts.',
      'The slowly add flour until the dough starts to form together (need to be able to form doughballs).',
      'Add in chocolate chips/chunks. I like to chop up a nice dark chocolate to add in addition to semi sweet chips.',
      'Let sit at least one hour in the frdge, better in the freezer overnight.',
      'Make 1 inch balls and bake for around 10 minutes at 350. Take the tray out and tap it on the counter to make them bake flatter'
    ]
  }
];

const Cooking = () => {
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  const handleRecipeClick = (recipeId) => {
    setExpandedRecipe(recipeId);
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to the parent
    setExpandedRecipe(null);
  };

  return (
    <div className="cooking">
      <h1>Cooking</h1>
      <h2>I love to cook, and from my Mom I have learned how it can be both a form of meditation and a way to show love. Here are some recipes I have perfected over the years!</h2>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className={`recipe ${expandedRecipe === recipe.id ? 'expanded' : ''}`}
            onClick={() => handleRecipeClick(recipe.id)}
          >
            {expandedRecipe === recipe.id && (
              <button className="close-button" onClick={handleClose}>
                ×
              </button>
            )}
            <Recipe {...recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cooking;
