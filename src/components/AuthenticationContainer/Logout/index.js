import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../../helper/AuthContext';

const Logout = props => {

  const authUser = useContext(AuthContext);

  useEffect(() => {
    return () => {
      localStorage.removeItem('faceapi-token');
      localStorage.removeItem('faceapi-token-exp');
      localStorage.removeItem('userId');
      authUser.setAuth(false);
    }
  }, []);

  return (
    <Redirect to="/login" />
  );
};

export default Logout;
