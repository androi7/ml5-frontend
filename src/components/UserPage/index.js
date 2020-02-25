import React, { useState, useEffect } from 'react';
import ml5 from 'ml5';
import Sketch from 'react-p5';
import p5 from 'p5';

import ajax from '../../lib/ajax';
// import AuthContext from '../../helper/AuthContext';


const UserPage = props => {

  const [token, setToken] = useState('');
  // only for testing
  const [username, setUsername] = useState('');

  // const authUser =  useContext(AuthContext);

  const loadUserPage = () => {
    if (token) {
      ajax.openProfile(token, 'me')
        .then(res => {
          setUsername(res.data.username);
        })
        .catch(err => console.warn(err)); // ajax.openProfile()
    }
  }; // loadUserPage()

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    }, []
  );

  useEffect(loadUserPage, [token]);

  let capture;

  const setup = (p5, canvasRef) => {
    p5.createCanvas(500, 500).parent(canvasRef);
    capture = p5.createCapture(p5.VIDEO);
    capture.hide();

  };

  const draw = p5 => {
    p5.background(0);
    p5.image(capture, 0, 0);
  }

  return (
    <div>
      <p>
      Token: <span>{token}</span><br />
      Username: <span>{username}</span>
      </p>
      <Sketch setup={setup} draw={draw} />
    </div>
  ); // return()
}; // UserPage()

export default UserPage;
