import React, { useState, useReducer } from 'react';
import ajax from '../../lib/ajax';

const Signup = props => {

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  ); // useReducer()

  const [token, setToken] = useState('');

  const handleInput = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    setUserInput({[name]: value});
  }; // handleInput()

  const handleSubmit = event => {
    event.preventDefault();
    // username, email, password, passwordConfirmation
    ajax.signup(userInput.username, userInput.email, userInput.password, userInput.passwordConfirmation)
      .then(res => {
        console.log(res);
        setToken(res.data.token);
      })
      .catch(err => console.warn('Signup error', err));
  }; // handleSubmit()

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:
        <input type="text"
               name="username"
               placeholder="username"
               onChange={handleInput} />
      </label>
      <label>
        <input type="email"
               name="email"
               placeholder="email"
               onChange={handleInput} />
      </label>
      <label>Password:
        <input type="password"
               name="password"
               placeholder="password"
               onChange={handleInput} />
      </label>
      <label>Confirm Password:
        <input type="password"
               name="passwordConfirmation"
               placeholder="confirm password"
               onChange={handleInput} />
      </label>
      <input type="submit" value="Sign Up"/>
    </form>
  ); // return()
}; // Signup()

export default Signup;
