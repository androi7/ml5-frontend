import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {

  return (
    <div>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>SignUp</button>
      </Link>
    </div>
  );
}

export default Home;
