import React, {useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/AuthenticationContainer/Login';
import Signup from './components/AuthenticationContainer/Signup';
//import UserPage from './components/UserPage';
import PrivateRoute from './components/PrivateRoute';
import PublicChat from './components/ChatContainer/PublicChat';
import PrivateChat from './components/ChatContainer/PrivateChat';
import ChatRoom from './components/ChatContainer/ChatRoom';
import Video from './components/Video';
import Gallery from './components/Gallery';
import Profile from './components/Profile';
import AuthContext from './helper/AuthContext';
import Logout from './components/AuthenticationContainer/Logout';
import { Header, Footer } from './components/Layout';
import setAuthToken from './helper/setAuthToken';


const Routes = props => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [auth, setAuth] = useState(false);

  if (localStorage['faceapi-token']) {
    setAuthToken(localStorage['faceapi-token']);
  }

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
        <Header auth={auth} />

        {auth ? <Footer /> : null}

        <div>
          <AuthContext.Provider value={{user: {username, email}, setUsername: (props) => setUsername(props), setEmail: (props) => setEmail(props), setAuth: (props) => setAuth(props)}}>
            <Route exact path="/" component={ Home } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/logout" component={ Logout } />
            <Route exact path="/login" component={ Login } />
            <PrivateRoute exact path="/user/me" handleAuthCheck={loggedIn} component={ Gallery } />
            <PrivateRoute exact path="/chat" handleAuthCheck={loggedIn} component={ ChatRoom } />
            <PrivateRoute exact path="/video" handleAuthCheck={loggedIn} component={ Video } />
            <PrivateRoute exact path="/profile" handleAuthCheck={loggedIn} component={ Profile } />
            <PrivateRoute exact path="/chat/privateChat" handleAuthCheck={loggedIn} component={ PrivateChat } />
            <PrivateRoute exact path="/chat/publicChat" handleAuthCheck={loggedIn} component={ PublicChat } />
          </AuthContext.Provider>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
