import React, { useState, useEffect } from 'react';
import ajax from '../../../lib/ajax';


const MiniGallery = ({ img }) => {

  const [token, setToken] = useState('');
  const [gallery, setGallery] = useState([]);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('faceapi-token');
    setToken(token);
  }, []);


  useEffect(() => {
    ajax.getGallery(token).then(res => {
      setGallery(res.data.map((img, ind) => <img key={ind} onClick={handleSelectImage} src={img} width="50" alt="" />));
    });
  }, [token]);

  useEffect(() => {
    img(imageSrc);
  }, [imageSrc]);

  const handleSelectImage = e => {
    const imgSource = e.target.src;
    setImageSrc(imgSource);
  };

  return (
    <div style={{height: '60px', width: '100px', overflow: 'scroll'}}>
      {gallery}
    </div>
  );
};

export default MiniGallery;
