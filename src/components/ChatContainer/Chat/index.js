import React, { useState, useEffect, useContext, Fragment } from 'react';
import socketIOClient from 'socket.io-client';
import AuthContext from '../../helper/AuthContext';
import ajax from '../../lib/ajax';

const ENDPOINT = "http://localhost:3001";


const ChatMessage = props => {

  return (
    <div>
      <h2>{props.username}</h2>
      <p>{props.message}</p>
    </div>
  );
};

const Participants = props => {



  const [userList, setUserList] = useState([]);

  const loadParticipants = () => {
    if (props.token) {
      ajax.getParticipants(props.token)
        .then(res => {
          res.data.forEach(userData => setUserList(userList => [...userList, {name: userData.name, id: userData.id}]));
          console.log('res data', res.data);
          console.log('userlist', userList);
        })
        .catch(err => console.warn(err));
    }
  };

  useEffect(loadParticipants, [props.token]);

  return (
    <Fragment>
      <ul>
        {userList.map(u => {
        return <li key={u.id} style={{listStyleType: "none"}}>{u.name}</li>}
        )}
      </ul>
    </Fragment>
  )
}


const Chat = props => {

  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const userAuth = useContext(AuthContext);
  const {user: { email }} = userAuth;
  const {user: { username }} = userAuth;


  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {

    setMessageList(messageList => [])
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
    const token = localStorage.getItem('token');
    setToken(token);
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
      <Participants token={token} />

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
