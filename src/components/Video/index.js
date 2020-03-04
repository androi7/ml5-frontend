import React, { useState, useEffect } from 'react';
import ml5 from 'ml5';
import P5Wrapper from 'react-p5-wrapper';
import Images from './Images';
import sketch from './sketch';

const Video = props => {

  const [snap, setSnap] = useState(false);
  const [imgStream, setImgStream] = useState(null);
  const [stopVideo, setStopVideo] = useState(false);

  // useEffect(() => {
  //   setStopVideo(true);
  // }, []);

  const stopVid = () => {
    setStopVideo(true);
  };

  const handleClick = () => {
    setImgStream(null);
    setSnap(true);
  };

  const setSnapFalse = () => {
    setSnap(false);
  };

  const setImageStream = (img) => {
    setImgStream(img);
    console.log('imagestream:', imgStream);
  };

  return (
    <div>
      <P5Wrapper sketch={sketch}
                 passSnap={snap}
                 onSetSnap={setSnapFalse}
                 capScreenshot={setImageStream}
                 stop={stopVideo}
      />
      <button onClick={handleClick}>Image</button>
      <Images snapImages={imgStream} />
      <button onClick={stopVid}>Stop</button>
    </div>
  );
};

export default Video;
