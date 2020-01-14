import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  // use class-base d component not functional component, bcz add the componentDidMount lifecycle hook to setup the axios interceptors
  //withErrorHandler creates these classes, is a class factory essentially
  return class extends Component {
    state = {
      error: null
    }

    // execute this code when this component here gets created
    constructor (props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        // have to return the request config so that the request can continue and for the response
        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({
            error: error
          });
        }
      )
    }

    // executed at hte point of time, a component isn't required anymore, so when we reuse withErrorHandler in our application, we don't create more and more interceptors with old ones living on
    componentWillUnmount() {
      // remove the interceptors to prevent memory leaks.
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
