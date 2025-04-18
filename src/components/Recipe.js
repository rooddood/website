import React from 'react';

const Recipe = ({ title, image, ingredients, sauce, instructions }) => {
  return (
    <>
      <h2>{title}</h2>
      <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={title} />
      <div className="recipe-content">
        <div className="recipe-column">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          
          {sauce && (
            <>
              <h3>Sauce</h3>
              <ul>
                {sauce.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="recipe-column">
          <h3>Instructions</h3>
          <ol>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Recipe; 