import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, SvgIcon, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
};

const Header = ({ auth }) => { // handleAuthCheck
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Button color='inherit' to="/" component={Link}>
              <HomeIcon color="secondary" />
          </Button>
        </IconButton>
        <Typography variant='h5'
                    color='inherit'
                    className={classes.flex}>
          Face Filter
        </Typography>

        {auth
          ? <Button color="inherit" to="/logout" component={Link} >
              Logout
            </Button>
          : <Fragment>
              <Button color="inherit" to="/login" component={Link} >
                Login
              </Button>
              <Button color="inherit" to="/signup" component={Link} >
                  Sign Up
              </Button>
            </Fragment>
          }
      </Toolbar>
    </AppBar>
  );
};

export default Header;
