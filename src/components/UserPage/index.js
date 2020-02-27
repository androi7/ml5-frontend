import React, { useState, useEffect } from 'react';

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
    const token = localStorage.getItem('faceapi-token');
    setToken(token);
    }, []
  );

  useEffect(loadUserPage, [token]);



  return (
    <div>
      <p>
      Token: <span>{token}</span><br />
      Username: <span>{username}</span>
      </p>
    </div>
  ); // return()
}; // UserPage()

export default UserPage;
