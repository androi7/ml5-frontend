import React, { useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Images from './Images';
import sketch from './sketch';
import { stream } from './sketch';
import { Button, IconButton } from '@material-ui/core';
import { PhotoCamera, HighlightOff } from '@material-ui/icons';
// import { CircularProgress } from '@material-ui/core';


const Video = props => {

  const [snap, setSnap] = useState(false);
  const [imgStream, setImgStream] = useState(null);
  const [stopVideo, setStopVideo] = useState(false);
  // const [loading, setLoading] = useState(true);

  const webCamStyle = {
    width: 640,
    height: 480,
    margin: '0 auto',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  };

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
  };

  return (
    <div>
      <div style={webCamStyle}>
        <P5Wrapper sketch={sketch}
                   style={{display: 'inline-block'}}
                   passSnap={snap}
                   onSetSnap={setSnapFalse}
                   capScreenshot={setImageStream}
                   stop={stopVideo}
                  />
        {/*
          loading && <CircularProgress color="secondary" style={{margin: '0 auto'}} />
      */}

      </div>

      <div style={{margin: '0 auto', width: 150}}>
        <IconButton color="primary"
                    style={{height: 50, width: 50}}
                    aria-label="upload picture"
                    component="span"
                    onClick={handleClick}
                    >
          <PhotoCamera />
        </IconButton>
        <IconButton color="primary"
                    style={{height: 50, width: 50}}
                    aria-label="upload picture"
                    component="span"
                    onClick={stopVid}
                    >
          <HighlightOff />
        </IconButton>
      </div>
      {
        imgStream && <Images snapImages={imgStream} />
      }

    </div>
  );
};

export default Video;
