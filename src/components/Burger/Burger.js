import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  // * transformedIngredients is an array which is either empty or contains the jsx elements
  // keys(): extracts the keys of a given object and turns that into an array, so it gives you an array of the keys.
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      // Array(): is default javascript object, not react object. It can create an array with it. For example Array(3): will give you an array with three empty spaces basically, with three undefined space
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
      })
      // do not care the element itself, so use the underscore(_) as an argument name to indicate that it's a blank .
    })
    .reduce((array, element) => {
      return array.concat(element);
    }, []);
    // [] is an initial value of this reduced value

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default withRouter(burger);
