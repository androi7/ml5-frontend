import React, {useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/AuthenticationContainer/Login';
import Signup from './components/AuthenticationContainer/Signup';
import UserPage from './components/UserPage';
import PrivateRoute from './components/PrivateRoute';
import Chat from './components/ChatContainer/Chat';
import Video from './components/Video';
import Gallery from './components/Gallery';
import Profile from './components/Profile';
import AuthContext from './helper/AuthContext';
import Logout from './components/AuthenticationContainer/Logout';
import { Header, Footer } from './components/Layout';

const Routes = props => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [auth, setAuth] = useState(false);

  // const authHandler = authCondition => {
  //   if(authCondition) {
  //     setAuth(true);
  //   } else {
  //     setAuth(false);
  //   }
  //   console.log('auth', auth);
  // };


  const loggedIn = () => {
    const tokenExpStart = localStorage.getItem('faceapi-token-exp');
    const tokenExpEnd = Date.now();
    const expireTime = 3600000; //milliseconds
    if (tokenExpEnd - tokenExpStart > expireTime) {
      localStorage.removeItem('faceapi-token-exp');
      localStorage.removeItem('faceapi-token');
      localStorage.removeItem('userId');
    }
    const token = localStorage.getItem('faceapi-token');
    return token;
  };



  return (
    <div>
      <Router>
        <Header auth={auth} /> {/* handleAuthCheck={loggedIn} checkAuth={authHandler}*/} 

        {auth ? <Footer /> : null}

        <div>
          <AuthContext.Provider value={{user: {username, email}, setUsername: (props) => setUsername(props), setEmail: (props) => setEmail(props), setAuth: (props) => setAuth(props)}}>
            <Route exact path="/" component={ Home } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/logout" component={ Logout } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute exact path="/user/me" handleAuthCheck={loggedIn} component={ Gallery } />
            <PrivateRoute exact path="/chat" handleAuthCheck={loggedIn} component={ Chat } />
            <PrivateRoute exact path="/video" handleAuthCheck={loggedIn} component={ Video } />
            <PrivateRoute exact path="/profile" handleAuthCheck={loggedIn} component={ Profile } />
          </AuthContext.Provider>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
