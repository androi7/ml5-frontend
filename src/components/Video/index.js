import React, { useState, useEffect } from 'react';
import ml5 from 'ml5';
import P5Wrapper from 'react-p5-wrapper';

import p5 from 'p5';


const Video = props => {

  function sketch (p) {

    let capture;
    let faceapi;
    let detections;
    let glasses;

    const detectionOptions = {
      withLandmarks: true,
      withDescriptors: false,
    };

    // p.preload = () => {
    //   glasses = p.loadImage('/thug-life-glasses.jpg');
    // }

    p.setup = () => {
      p.createCanvas(360, 270);
      capture = p.createCapture('VIDEO');
      capture.size(p.width, p.height);
      capture.hide();
      faceapi = ml5.faceApi(capture, detectionOptions, modelLoaded);
    };

    const modelLoaded = () => {
      console.log('Model Loaded!');
      faceapi.detect(gotResults);
    };

    const gotResults = (err, result) => {
      if (err) {
          console.log(err)
          return
      }

      detections = result;

      // background(220);
      p.background(255);
      p.image(capture, 0,0, p.width, p.height); // p.width * capture.height / capture.width
      if (detections) {
          if (detections.length > 0) {
              // drawBox(detections)
              drawLandmarks(detections)
          }

      }
      faceapi.detect(gotResults)
    };

    const drawBox = detections => {
      console.log('props.', detections);
        for(let i = 0; i < detections.length; i++){
            const alignedRect = detections[i].alignedRect;
            const x = alignedRect._box._x
            const y = alignedRect._box._y
            const boxWidth = alignedRect._box._width
            const boxHeight  = alignedRect._box._height

            console.log(`x: ${x}, y: ${y}, boxWidth: ${boxWidth}, boxHeight: ${boxHeight}`);
            p.noFill();
            p.stroke(161, 95, 251);
            p.strokeWeight(10);
            p.rect(x, y, boxWidth, boxHeight);
      }
    };

    const drawLandmarks = detections => {
        p.noFill();
        p.stroke(161, 95, 251)
        p.strokeWeight(2)

        for(let i = 0; i < detections.length; i++){
            const mouth = detections[i].parts.mouth;
            const nose = detections[i].parts.nose;
            const leftEye = detections[i].parts.leftEye;
            const rightEye = detections[i].parts.rightEye;
            const rightEyeBrow = detections[i].parts.rightEyeBrow;
            const leftEyeBrow = detections[i].parts.leftEyeBrow;

            console.log('eye', leftEye);
            // glasses.loadPixels();
            // glasses.set(leftEye[0]._x);
            // p.loadImage('thug-life-glasses.jpg', img => p.image(img, 0, 0));


            p.loadImage("https://lh3.googleusercontent.com/proxy/UD33uV9QtNCzbqxAgD7aAzZm-VFKvOuFXhrk_GiKLacf06_HBkwpz-fd8z5eGLfgggqUF2EAGSaGk0NiWIz2L2FtVVvm3ltVxwPY6RWeCI-YlcvhPV8zOvxmWx6o975WgcDk0Xu79g", i => {p.image(i, leftEye[0]._x - 25, leftEye[0]._y-40, p.width/3, p.height/3);});
            drawPart(mouth, true);
            drawPart(nose, false);
            drawPart(leftEye, true);
            drawPart(leftEyeBrow, false);
            drawPart(rightEye, true);
            drawPart(rightEyeBrow, false);
        }
    };

    const drawPart = (feature, closed) => {
        p.beginShape();
        for(let i = 0; i < feature.length; i++){
            const x = feature[i]._x
            const y = feature[i]._y
            p.vertex(x, y)
        }

        if(closed === true){
            p.endShape('CLOSE');
        } else {
            p.endShape();
        }
    };

    // p.draw = function () {
    //   p.background(0);
    //   p.image(capture, 0, 0, p.width, p.width * capture.height / capture.width);
    // };
  };




  return (
    <div>
      <P5Wrapper sketch={sketch} />
    </div>
  )
};

export default Video;
