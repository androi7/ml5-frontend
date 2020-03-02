import React, { useState, useEffect, Fragment } from 'react';
import ml5 from 'ml5';
import P5Wrapper from 'react-p5-wrapper';
import Image from './Image';
import sketch from './sketch';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqo5zfv4u';

const Video = props => {

  const [snap, setSnap] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  // const imgRef = React.createRef();

  const handleClick = () => {
    setSnap(true);
  };

  const setSnapFalse = () => {
    setSnap(false);
  };

  const setImage = (img) => {
    setCurrentImg(img);
  };

  useEffect(() => {
    console.log('changed image:', currentImg);
  }, [currentImg]);

  return (
    <div>
      <P5Wrapper sketch={sketch}
                 passSnap={snap}
                 onSetSnap={setSnapFalse}
                 capScreenshot={setImage}
                 />
      <button onClick={handleClick}>Image</button>
      <Image snapImage={currentImg} />
      {/*<img src="#" />*/}
    </div>
  );
};

export default Video;
