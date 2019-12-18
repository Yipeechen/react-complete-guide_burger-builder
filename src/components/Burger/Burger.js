import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  // keys(): extracts the keys of a given object and turns that into an array, so it gives you an array of the keys.
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      // Array(): is default javascript object, not react object. It can create an array with it. For example Array(3): will give you an array with three empty spaces basically, with three undefined space
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
      })
      // do not care the element itself, so use the underscore(_) as an argument name to indicate that it's a blank .
    });
  
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
