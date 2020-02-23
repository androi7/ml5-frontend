import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, handleAuthCheck, ...rest}) => (
  <Route {...rest} render={(props) => (
    handleAuthCheck()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default PrivateRoute;
