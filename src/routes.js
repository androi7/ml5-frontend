import React, {useState} from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/ChatContainer/Chat';
import AuthContext from './helper/AuthContext';

const Routes = props => {

  const loginToken = () => localStorage.getItem('token');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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
          {/*<Link to="/logout">
            <button>Logout</button>
          </Link> */ }
          <br/>
        </nav>

        <div>

          <Route exact path="/" component={ Home } />
          <Route exact path="/signup" component={ Signup } />
          <AuthContext.Provider value={{user: {username, email}, setUsername: (props) => setUsername(props), setEmail: (props) => setEmail(props) }}>
            <Route exact path="/login" component={ Login } />
            {/*<Route exact path="/logout" component={ Logout } /> */}
            <PrivateRoute exact path="/user/:userId" handleAuthCheck={loginToken} component={ UserPage } />
            <PrivateRoute exact path="/chat" handleAuthCheck={loginToken} component={ Chat } />
          </AuthContext.Provider>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
