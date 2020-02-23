import React, { Fragment, useState, useReducer } from 'react';
import Home from '../Home';

import ajax from '../lib/ajax';

const Login = props => {

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      email: '',
      password: ''
    }
  );

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const handleInput = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    console.log('name', name, 'value', value);
    setUserInput({[name]: value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    ajax.login(userInput.email, userInput.password)
      .then(res => {
        console.log(res);
        setToken(res.data.token);
        return res.data.token;
      })
      .then(res => {
        ajax.openProfile(res).then(result => {
          console.log(result);
          setUsername(result.data.username);
        });
      })
      .catch(err => console.warn('Login error', err));


  };

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
        <input type="submit" value="Submit" />
      </form>
      <p>
      Token: <span>{token}</span><br />
      Username: <span>{username}</span>
      </p>

    </Fragment>
  );
};

export default Login;
