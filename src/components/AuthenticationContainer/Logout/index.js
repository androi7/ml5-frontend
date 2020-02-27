import React, { useEffect } from 'react';

const Logout = ({history}) => {
  localStorage.removeItem('faceapi-token');
  localStorage.removeItem('faceapi-token-exp');

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div>
      See you soon!
    </div>
  );
};

export default Logout;
