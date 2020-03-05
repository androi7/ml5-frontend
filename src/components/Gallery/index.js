import React, { useState, useEffect, Fragment } from 'react';
import ajax from '../../lib/ajax';
import { Grid, Paper } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: 20,
    maxHeight: '80vh',
    overflow: 'scroll'
  },
  image: {
    width: '100%',
    marginTop: '5vh',
    borderRadius: 5,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '&:hover': {
      opacity: 0.5
    }
  }
};

const useStyles = makeStyles(styles);

const theme = createMuiTheme({
  overrides: {
    MuiSkeleton: {
      root: {
        display: 'inline-block',
        margin: 10,
        backgroundColor: '#00000033'
      }
    }
  }
});

const Gallery = () => {

  const classes = useStyles();

  const [token, setToken] = useState('');
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('faceapi-token');
    setToken(token);

  }, []);


  useEffect(() => {
    ajax.getGallery(token).then(res => {
      setGallery(res.data.map((img, ind) => (
        <Grid item xs={4} md={3} key={ind}>
          <img src={img} className={classes.image} alt="" />
        </Grid>
      )));
    });
  }, [token]);


  return (
    <div className={classes.root}>
      <Grid container spacing={5} justify="center">
      {
        gallery.length > 0
        ? gallery
        : <MuiThemeProvider theme={theme}>
            <Fragment>
              <div style={{textAlign: 'center', marginTop: 20}}>
              <Skeleton variant="rect" width={300} height={200} />
              <Skeleton variant="rect" width={300} height={200} />
              </div>
              <div style={{textAlign: 'center', margin: 'auto'}}>
              <Skeleton variant="rect" width={300} height={200} />
              <Skeleton variant="rect" width={300} height={200} />
              </div>
            </Fragment>
          </MuiThemeProvider>
      }
      </Grid>
    </div>
  );
};

export default Gallery;
