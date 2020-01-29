import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else {
        //  convert this into a number by adding a plus
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients,
      totalPrice: price
    });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          // component={ContactData}
          // pass history which we do get in the props of this render method here
          render={props => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
        />
      </div>
    )
  }
}

export default Checkout;
