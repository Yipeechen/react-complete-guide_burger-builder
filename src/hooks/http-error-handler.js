import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    // have to return the request config so that the request can continue and for the response
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
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
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);
  
  const errorConfirmedHandler = () => {
    setError(null);
  }

  return [error, errorConfirmedHandler];
}