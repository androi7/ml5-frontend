import React, { useReducer } from 'react';
import ajax from '../../../lib/ajax';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      width: 350,
      marginBottom: 15
    }
  },
  button: {
    marginTop: 30,
    width: 200,
    marginLeft: 75
  }

}));

const Signup = ({ history }) => {

  const classes = useStyles();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  ); // useReducer()

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
        history.push('/login');
      })
      .catch(err => console.warn('Signup error', err));
  }; // handleSubmit()

  return (
    <form className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{display: 'block', width: 350, margin: '100px auto'}}
          >

      <TextField label="Username"
                 name="username"
                 onChange={handleInput}
                 />
      <TextField label="Email"
                 type="email"
                 name="email"
                 onChange={handleInput}
                 />
      <TextField label="Password"
                 type="password"
                 name="password"
                 onChange={handleInput}
                 />
      <TextField label="Password Confirmation"
                 type="password"
                 name="passwordConfirmation"
                 onChange={handleInput}
                 />

      <Button type="submit" variant="outlined" color="secondary" className={classes.button} >
        Sign Up
      </Button>
    </form>
  ); // return()
}; // Signup()

export default Signup;
