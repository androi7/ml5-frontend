import React, { useState, useEffect } from 'react';
import ajax from '../../../lib/ajax';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: 640,
    height: 400,
    margin: '0 auto',
    borderRadius: 3,
    justifyContent: 'center',
    overflow: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: 10,
      width: 180,
      height: 135
    },
  },
}));

const Images = (props) => {

  const classes = useStyles();

  const [token, setToken] = useState('');
  const [image, setImage] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('faceapi-token'));
    return () => {
      setStream(null);
      setImage('');
    }
  }, []);

  useEffect(() => {
    if(image) {
      ajax.uploadImage(image, token).then(res => {
        setImage(res.secure_url)
      });
    }
  }, [image]);

  useEffect(() => {
    setStream(props.snapImages);
  }, [props.snapImages]);


  const imageHandler = e => {
    // send whole image object from saveFrames to get filename and imageData
    setImage(stream[e.target.getAttribute('data-index')]);
    setStream(null);
  }

  return (
    <div style={{display: 'inline'}}>

      <div className={classes.root}>
        <h3>Select Image</h3>
        {
          stream
            ? stream.map((img, ind) => (
                <Paper key={ind} elevation={20}>
                  <img src={img.imageData}
                       onClick={imageHandler}
                       data-index={ind}
                       style={{ width: 'inherit', borderRadius: 4 }}
                       />
                </Paper>
              ))
            : null
        }
      </div>
    </div>
  );
};

export default Images;
