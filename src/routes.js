import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import PrivateRoute from './components/PrivateRoute';

const Routes = props => {

  const loginToken = () => localStorage.getItem('token');

  return (
    <div>
      <Router>
        <nav>
          <Link to="/">Home</Link> | &nbsp;
          <Link to="/login">Login</Link> | &nbsp;
          <Link to="/signup">Sign Up</Link> | &nbsp;
          <Link to="/user/me">Profile</Link>
          <br/>
        </nav>

        <div>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/signup" component={ Signup } />
          <PrivateRoute exact path="/user/:userId" handleAuthCheck={loginToken} component={ UserPage } />
        </div>
      </Router>
    </div>
  );
};

export default Routes;
