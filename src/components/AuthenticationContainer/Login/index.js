import React, { Fragment, useReducer, useContext } from 'react';
// import Home from '../../Home';
import AuthContext from '../../../helper/AuthContext';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ajax from '../../../lib/ajax';

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

const Login = props => {
  const classes = useStyles();

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
        localStorage.setItem('faceapi-token', res.data.token);
        localStorage.setItem('faceapi-token-exp', Date.now())
        localStorage.setItem('userId', res.data.id);
        authUser.setUsername(res.data.username);
        authUser.setEmail(res.data.email);
        return res.data.token;
      })
      .then(res => {
        const route = `/user/me`
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
      {/*<Home />*/}
      <form className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{display: 'block', width: 350, margin: '100px auto'}}
            >
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
        <Button type="submit" variant="outlined" color="secondary" className={classes.button} >
          Login
        </Button>
      </form>
    </Fragment>
  ); // return()
}; // Login()

export default Login;
