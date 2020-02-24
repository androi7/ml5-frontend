import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/Chat';

const Routes = props => {

  const loginToken = () => localStorage.getItem('token');

  return (
    <div>
      <Router>
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link> | &nbsp;
          <Link to="/login">
            <button>Login</button>
          </Link> | &nbsp;
          <Link to="/signup">
            <button>Sign Up</button>
          </Link> | &nbsp;
          <Link to="/user/me">
            <button>Profile</button>
          </Link>
          <Link to="/chat">
            <button>Chat</button>
          </Link>
          <br/>
        </nav>

        <div>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/signup" component={ Signup } />
          <PrivateRoute exact path="/user/:userId" handleAuthCheck={loginToken} component={ UserPage } />
          <PrivateRoute exact path="/chat" handleAuthCheck={loginToken} component={ Chat } />
        </div>
      </Router>
    </div>
  );
};

export default Routes;
