import React, { useState, useEffect } from 'react';
import ajax from '../../../lib/ajax';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    height: 100,
    position: 'absolute',
    left: '40%',
    margin: '0 auto',
    bottom: 150,
    borderRadius: 3,
    justifyContent: 'center',
    overflow: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: 10,
      width: 80,
      height: 60
    },
  },
}));


const MiniGallery = ({ img, removeGallery }) => {

  const classes = useStyles();

  const [token, setToken] = useState('');
  const [gallery, setGallery] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('faceapi-token');
    setToken(token);
  }, []);


  useEffect(() => {
    ajax.getGallery(token).then(res => {
      setGallery(res.data.map((img, ind) => (
        <Paper key={ind} elevation={20}>
          <img onClick={handleSelectImage} src={img} style={{ width: 'inherit', borderRadius: 4}} alt="" />
        </Paper>
      )));
    });
  }, [token]);

  useEffect(() => {
    img(imageSrc);

    if(imageSrc) {
      removeGallery();
    }
  }, [imageSrc]);

  const handleSelectImage = e => {
    const imgSource = e.target.src;
    setImageSrc(imgSource);
  };

  // style={{height: '150px', width: '200px', overflow: 'scroll', margin: '0 auto', position: 'absolute', bottom: 150}}

  return (
    <div className={classes.root}>
      {gallery}
    </div>
  );
};

export default MiniGallery;
