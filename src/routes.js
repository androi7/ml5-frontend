import React, {useState, Fragment} from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/AuthenticationContainer/Login';
import Signup from './components/AuthenticationContainer/Signup';
import UserPage from './components/UserPage';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/ChatContainer/Chat';
import AuthContext from './helper/AuthContext';
import Logout from './components/AuthenticationContainer/Logout';
import { Header, Footer } from './components/Layout';

const Routes = props => {

  // not secure!!!!
  const loggedIn = () => {
    const tokenExpStart = localStorage.getItem('faceapi-token-exp');
    const tokenExpEnd = Date.now();
    const expireTime = 30000; //miliseconds
    if (tokenExpEnd - tokenExpStart > expireTime) {
      localStorage.removeItem('faceapi-token-exp');
      localStorage.removeItem('faceapi-token');
    }
    return localStorage.getItem('faceapi-token');
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <Router>
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link> | &nbsp;
          {loggedIn()
            ? null
            : <Fragment>
                <Link to="/login">
                  <button>Login</button>
                </Link> | &nbsp;
              </Fragment>}
          {loggedIn()
            ? null
            : <Fragment>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link> | &nbsp;
              </Fragment>}
          {loggedIn()
            ? <Fragment>
                <Link to="/user/me">
                  <button>Profile</button>
                </Link>| &nbsp;
              </Fragment>
            : null}
          {loggedIn()
            ? <Fragment>
                <Link to="/chat">
                  <button>Chat</button>
                </Link>| &nbsp;
              </Fragment>
            : null}
          {loggedIn()
            ? <Fragment>
                <Link to="/logout">
                  <button>Logout</button>
                </Link>
              </Fragment>
            : null}
        </nav>
        <Header />

        <Footer />
        <div>

          <Route exact path="/" component={ Home } />
          <Route exact path="/signup" component={ Signup } />
          <Route exact path="/logout" component={ Logout } />
          <AuthContext.Provider value={{user: {username, email}, setUsername: (props) => setUsername(props), setEmail: (props) => setEmail(props) }}>
            <Route exact path="/login" component={ Login } />
            {/*<Route exact path="/logout" component={ Logout } /> */}
            <PrivateRoute exact path="/user/me" handleAuthCheck={loggedIn} component={ UserPage } />
            <PrivateRoute exact path="/chat" handleAuthCheck={loggedIn} component={ Chat } />
          </AuthContext.Provider>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
