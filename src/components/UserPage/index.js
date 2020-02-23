import React, { useState, useEffect } from 'react';
import ajax from '../../lib/ajax';



const UserPage = props => {

  const [token, setToken] = useState('');
  // only for testing
  const [username, setUsername] = useState('');

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
    console.log('useeffect');
    const token = localStorage.getItem('token');
    console.log('localstorage:', token);
    setToken(token);
    }, []
  );

  useEffect(loadUserPage, [token]);

  return (
    <p>
    Token: <span>{token}</span><br />
    Username: <span>{username}</span>
    </p>
  ); // return()
}; // UserPage()

export default UserPage;
