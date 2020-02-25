import React, { Fragment, useReducer, useContext } from 'react';
import Home from '../Home';
import AuthContext from '../../helper/AuthContext';

import ajax from '../../lib/ajax';

const Login = props => {

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      email: '',
      password: ''
    }
  ); // useReducer()

  // const [token, setToken] = useState('');
  // const [username, setUsername] = useState('');

  const authUser = useContext(AuthContext);

  const handleInput = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    setUserInput({[name]: value});
  }; // handleInput()

  const handleSubmit = event => {
    event.preventDefault();
    ajax.login(userInput.email, userInput.password)
      .then(res => {
        console.log(res);
        // setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.id);
        authUser.setUsername(res.data.username);
        authUser.setEmail(res.data.email);
        return res.data.token;
      })
      .then(res => {
        const route = `/user/me` // instead of me use 'user ID'
        props.history.push(route);
        // ajax.openProfile(res, 'me').then(result => {
        //   console.log(result);
        //   setUsername(result.data.username);
        // });
      })
      .catch(err => console.warn('Login error', err));
  }; // handleSubmit()

  return (
    <Fragment>
      <Home />
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" name="email" placeholder="email" onChange={handleInput} />
        </label>
        <label>Password:
          <input type="password" name="password" placeholder="password" onChange={handleInput} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </Fragment>
  ); // return()
}; // Login()

export default Login;
