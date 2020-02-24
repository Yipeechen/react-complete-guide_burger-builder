import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

// use as global constants in all capital characters
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // 1-1) it is alternative, this constructor syntax will work absolutely fine to
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  // 1-2) the more modern method and shorter syntax
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount () {
    // fetch ingredient from the backend
    // axios.get('https://react-my-burger-22313.firebaseio.com/ingredients.json')
    // .then(response => {
    //   this.setState({
    //     ingredients: response.data
    //   });
    // })
    // .catch(
    //   error => {
    //     this.setState({
    //       error: true
    //     });
    //   }
    // );
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        // to get the array of the value
        return ingredients[ingredientKey];
      })
      .reduce((sum, element) => {
        // arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)
        return sum + element;
      }, 0);
      this.setState({
        purchasable: sum > 0
      })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    // creating a new object here, not just modify on previous object
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }
  
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    // creating a new object here, not just modify on previous object
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  // use the same method syntax purchaseHandler() {...} as use for render() {...}
  // 1. if we try to use the 'this' keyword in there, and triggered through an event due to the way the 'this' keyword works in JS, will not refer to the class
  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
    }
    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  render () {
    const disabledInfo = {
      ...this.props.ings,
    };

    // disabledInfo = { salad: true, meat: false, ...}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
          <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
              price={this.state.totalPrice}
            />
          </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
