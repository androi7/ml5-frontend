import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import AuthContext from '../../../helper/AuthContext';
// import ajax from '../../../lib/ajax';
import UserList from '../UserList';
import ChatMessage from '../ChatMessage';

const ENDPOINT = "http://localhost:3001";

const Chat = props => {

  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const userAuth = useContext(AuthContext);
  const {user: { email }} = userAuth;
  const {user: { username }} = userAuth;


  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {

    setMessageList(messageList => []);
    socket.on('all messages', data => {

      setMessageList(messageList => [...messageList, {message: data.message, user: data.user}]);
      console.log('list:', messageList);
      // console.log('websocket:', data);
      // setMessage(data.welcome);
    });

    const token = localStorage.getItem('faceapi-token');
    setToken(token);


    // socket.on('welcome', data => {
    //   setMessage(data.newUser);
    // });
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setToken(token);
  // }, []);

  useEffect(() => {
    return () => {
      socket.close();
    }
  }, []);


  const handleInput = evt => {
    const currentText = evt.target.value;
    setMessage(currentText);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    socket.emit('message', {
      message,
      user: {email, username}
    });
  };



  return (
    <div>
      {token ? <UserList token={token} /> : null}

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} />
        <input type="submit" value="Send"/>
      </form>

      <div>
        {messageList.map((m,i) => {
          console.log(m, i);
          return <ChatMessage key={i} username={m.user.username} message={m.message} />;})
        }
      </div>
    </div>
  );
};


export default Chat;
