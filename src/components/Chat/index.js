import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3001";


const ChatMessage = props => {

  return (
    <div>
      <h2>{props.username}</h2>
      <p>{props.message}</p>
    </div>
  );
};


const Chat = props => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const socket = socketIOClient(ENDPOINT);



  useEffect(() => {
    // socket.emit('user', {
    //   user: localStorage.getItem('token')
    // });

    socket.on('all messages', data => {

      setMessageList(messageList => [...messageList, data.message]);
      console.log('list:', messageList);
      // console.log('websocket:', data);
      // setMessage(data.welcome);
    });

    // socket.on('welcome', data => {
    //   setMessage(data.newUser);
    // });
  }, []);


  const handleInput = evt => {
    const currentText = evt.target.value;
    setMessage(currentText);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    socket.emit('message', {
      message: message
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} />
        <input type="submit" value="Send"/>
      </form>
      <div>
        {messageList.map((m,i) => {
          console.log(m, i);
          return <ChatMessage key={i} username={'user'} message={m} />;})
        }
      </div>
    </div>
  );
};




export default Chat;
