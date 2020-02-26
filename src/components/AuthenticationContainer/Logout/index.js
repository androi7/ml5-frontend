import React, { useEffect } from 'react';

const Logout = props => {
  localStorage.removeItem('faceapi-token');
  localStorage.removeItem('faceapi-token-exp');

  useEffect(() => {
    const timer = setTimeout(() => {
      props.history.push('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      See you soon!
    </div>
  );
};

export default Logout;
