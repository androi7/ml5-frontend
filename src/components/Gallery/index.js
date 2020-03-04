import React, { useState, useEffect } from 'react';
import ajax from '../../lib/ajax';

const Gallery = () => {

  const [token, setToken] = useState('');
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('faceapi-token');
    setToken(token);
  }, []);

  useEffect(() => {
    ajax.getGallery(token).then(res => {
      console.log('...res', res);
      console.log('...res.data', res.data);
      setGallery(res.data.map((img, ind) => <img key={ind} src={img} width="200" />));
      console.log('...gallery', gallery);
    });
  }, [token]);

  return (
    <div>
      {gallery}
    </div>
  );
};

export default Gallery;
