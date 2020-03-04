import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Images from './Images';
import sketch from './sketch';
import { stream } from './sketch'

const Video = props => {

  const [snap, setSnap] = useState(false);
  const [imgStream, setImgStream] = useState(null);
  const [stopVideo, setStopVideo] = useState(false);

  useEffect(() => {
    return () => {
      setStopVideo(true);

      // only external import of stream possible so far, sketch doesn't allow returning props via cb
      if (stream) {
        stream.getTracks().forEach(
          track => track.stop()
        );
      }
    };
  }, []);

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
