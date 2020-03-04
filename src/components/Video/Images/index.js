import React, { useState, useEffect } from 'react';
import ajax from '../../../lib/ajax';

const Images = (props) => {

  const [token, setToken] = useState('');
  const [image, setImage] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('faceapi-token'));
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
    <div>
      {
        stream ? stream.map((img, ind) => <img key={ind} src={img.imageData} onClick={imageHandler} data-index={ind} width="100" />) : null
      }
    </div>
  );
};

export default Images;
