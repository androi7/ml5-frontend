import React, { useState, useEffect, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import AuthContext from '../../helper/AuthContext';

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

  const userAuth = useContext(AuthContext);
  const {user: { email }} = userAuth;
  const {user: { username }} = userAuth;


  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {

    socket.on('all messages', data => {

      setMessageList(messageList => [...messageList, {message: data.message, user: data.user}]);
      console.log('list:', messageList);
      // console.log('websocket:', data);
      // setMessage(data.welcome);
    });

    // socket.on('welcome', data => {
    //   setMessage(data.newUser);
    // });
  }, []);

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
