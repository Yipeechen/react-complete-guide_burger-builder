import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const burgerBuilder = props => {
  // 1-1) it is alternative, this constructor syntax will work absolutely fine to
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  // useSelector: takes a function as argument which will give you your current state because this function will be executed by react redux
  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        // to get the array of the value
        return ingredients[ingredientKey];
      })
      .reduce((sum, element) => {
        // arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)
        return sum + element;
      }, 0);
      return sum > 0;
  }

  // use the same method syntax purchaseHandler() {...} as use for render() {...}
  // 1. if we try to use the 'this' keyword in there, and triggered through an event due to the way the 'this' keyword works in JS, will not refer to the class
  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...ings,
  };

  // disabledInfo = { salad: true, meat: false, ...}
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (ings) {
    burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
            price={price}
          />
        </Aux>
    );
    orderSummary = <OrderSummary
      ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />;
  }

  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

export default withErrorHandler(burgerBuilder, axios);
