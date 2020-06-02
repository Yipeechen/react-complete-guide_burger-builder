import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  // use class-base d component not functional component, bcz add the componentDidMount lifecycle hook to setup the axios interceptors
  //withErrorHandler creates these classes, is a class factory essentially
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      // have to return the request config so that the request can continue and for the response
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      res => res,
      err => {
        setError(err);
      }
    );

    // executed at hte point of time, a component isn't required anymore, so when we reuse withErrorHandler in our application, we don't create more and more interceptors with old ones living on
    useEffect(() => {
      // clean up function: use return function, means componentWillUnMount()
      return () => {
        // remove the interceptors to prevent memory leaks.
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    }

      return (
        <Aux>
          <Modal
            show={error}
            modalClosed={errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      );
  }
}

export default withErrorHandler;
