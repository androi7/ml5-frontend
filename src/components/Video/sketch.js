import ml5 from 'ml5';

export let stream;
export default function sketch (p) {

  let capture;
  let faceapi;
  let detections;
  let cnv;
  let stop = false;
  
  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
    // minConfidence: 0.5,
    // MODEL_URLS: {
    //   Mobilenetv1Model: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/ssd_mobilenetv1_model-weights_manifest.json',
    //   FaceLandmarkModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_model-weights_manifest.json',
    //   FaceLandmark68TinyNet: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_landmark_68_tiny_model-weights_manifest.json',
    //   FaceRecognitionModel: 'https://raw.githubusercontent.com/ml5js/ml5-data-and-models/face-api/models/faceapi/face_recognition_model-weights_manifest.json',
    // }
  };

  p.setup = () => {
    cnv = p.createCanvas(640, 480);
    // stop() directly on mediaElement doesn't work,
    // therefore necessary to catch the mediastream through the cb
    capture = p.createCapture('VIDEO', (streamRef) => {
      stream = streamRef;
    });
    capture.hide();
    faceapi = ml5.faceApi(capture, detectionOptions, modelLoaded);
  };


  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.passSnap){

      p.saveFrames(Date.now().toString(), 'png', 1, 60, data => {
        const images = [];
        for (let i = 0; i < data.length; i++) {
          images[i] = data[i]; //.imageData;
        }
        props.capScreenshot(images);
      });
      props.onSetSnap();
    }

    if (props.stop) {
      // disconnect webcam
      stream.getTracks().forEach(
        track => track.stop()
      );
      stop = true;
    }
  };

  const modelLoaded = () => {
    console.log('Model Loaded!');
    faceapi.detect(gotResults);
  };

  const gotResults = (err, result) => {
    if (err) {
        return console.error(err);
    } else if (stop) {
      return null;
    }

    detections = result;

    p.background(0);
    p.image(capture, 0,0, capture.width, p.width * capture.height / capture.width);
    if (detections) {
        if (detections.length > 0) {
            // drawBox(detections);
            // drawLandmarks(detections);
            drawImage(detections);
        }
    }
    faceapi.detect(gotResults);
  };

  const drawBox = detections => {
      for(let i = 0; i < detections.length; i++){
          const alignedRect = detections[i].alignedRect;
          const x = alignedRect._box._x
          const y = alignedRect._box._y
          const boxWidth = alignedRect._box._width
          const boxHeight  = alignedRect._box._height

          // console.log(`x: ${x}, y: ${y}, boxWidth: ${boxWidth}, boxHeight: ${boxHeight}`);
          p.noFill();
          p.stroke(161, 95, 251);
          p.strokeWeight(10);
          p.rect(x, y, boxWidth, boxHeight);
    }
  };

  const drawImage = detections => {
    if (detections[0]) {
      const mouth = detections[0].parts.mouth;
      const leftEye = detections[0].parts.leftEye;
      const rightEye = detections[0].parts.rightEye;

      const distance = rightEye[0]._x - leftEye[0]._x;

      // 700 x 700
      p.loadImage("https://res.cloudinary.com/dqo5zfv4u/image/upload/v1582733914/filters/a6840edbeea6704_m6pujr.png",
      i => {
        p.image(i, leftEye[0]._x - 25, leftEye[0]._y - 70, distance + 80, distance + 80);
      });

      p.loadImage("https://res.cloudinary.com/dqo5zfv4u/image/upload/v1582735777/filters/62-629243_thug-life-joint-transparent-thug-life-clipart_k3f2xy.png",
      i => {
        p.image(i, mouth[0]._x - 90, mouth[0]._y, p.width/2, p.height/2);
      });


    }
  }; // drawImage()

  const drawLandmarks = detections => {
      p.noFill();
      p.stroke(161, 95, 251)
      p.strokeWeight(2)

      for (let i = 0; i < detections.length; i++) {
          const mouth = detections[i].parts.mouth;
          const nose = detections[i].parts.nose;
          const leftEye = detections[i].parts.leftEye;
          const rightEye = detections[i].parts.rightEye;
          const rightEyeBrow = detections[i].parts.rightEyeBrow;
          const leftEyeBrow = detections[i].parts.leftEyeBrow;

          drawPart(mouth, true);
          drawPart(nose, false);
          drawPart(leftEye, true);
          drawPart(leftEyeBrow, false);
          drawPart(rightEye, false);
          drawPart(rightEyeBrow, false);
      }
  };

  const drawPart = (feature, closed) => {
      p.beginShape();
      for (let i = 0; i < feature.length; i++) {
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
};
