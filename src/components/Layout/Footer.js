import React from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  stickToBottom: {
    position: 'fixed',
    bottom: 0
  }
}));

const Footer = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position='static' className={classes.stickToBottom} >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='secondary'
        textColor='secondary'
        variant='standard'
        centered={true}
      >

        <Tab label="Gallery"
              component={Link}
              to='/user/me'
              />
        <Tab label='Chat'
             component={Link}
             to='/chat'
             />
        <Tab label="Video"
             component={Link}
             to="/video"
             />
           <Tab label="Profile"
                component={Link}
                to="/profile"
                />

      </Tabs>
    </AppBar>
  );
};


export default Footer;
