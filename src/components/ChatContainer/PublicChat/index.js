import React, { useState, useEffect, useContext, createRef } from 'react';
import socketIOClient from 'socket.io-client';
import ajax from '../../../lib/ajax';
import AuthContext from '../../../helper/AuthContext';
import UserList from '../UserList';
import ChatMessage from '../ChatMessage';
import MiniGallery from '../MiniGallery';

const ENDPOINT = "http://localhost:3001";

const PublicChat = props => {

  const [token, setToken] = useState('');
  const [message, setMessage] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  // const [imageToShow, setImageToShow] = useState('');

  const userAuth = useContext(AuthContext);
  const {user: { email }} = userAuth;
  const {user: { username }} = userAuth;

  const inputMessage = createRef();


  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {

    console.log('connecting to chat');
    const token = localStorage.getItem('faceapi-token');
    setToken(token);
    // clear messages
    setMessageList(messageList => []);

    socket.on('all messages', data => {
      if (data.type === 'txt' && data.message) {
        setMessageList(messageList => [...messageList, {message: data.message, user: data.user, type: data.type, image: data.image}]);
      } else if (data.type === 'img' && data.image) {
        setMessageList(messageList => [...messageList, {image: data.image, user: data.user, type: data.type, message: data.message}]);
      }
    });

    return () => {
      socket.close();
    }
  }, []);

  useEffect(() => {
    socket.emit('message', {
      type: 'img',
      message: '',
      image: imageSrc,
      user: {email, username}
    });
  }, [imageSrc]);

  const handleInput = evt => {
    const currentText = evt.target.value;
    setMessage(currentText);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    socket.emit('message', {
      type: 'txt',
      message,
      image: '',
      user: {email, username}
    });

    // clear input field
    inputMessage.current.value = '';
  };

  const handleUploadImage = () => {
    setShowImages(true);
  };

  const getImageSource = (img) => {
    setImageSrc(img);
  };


  return (
    <div>
      {token ? <UserList token={token} /> : null}

      {showImages && <MiniGallery img={getImageSource} />}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} ref={inputMessage} />
        <input type="submit" value="Send"/>
      </form>

      <button onClick={handleUploadImage}>Upload</button>

      <div>
        {messageList.map((m,i) => {
          return <ChatMessage key={i} username={m.user.username} message={m.message} image={m.image} type={m.type} />;})
        }
      </div>
    </div>
  );
};


export default PublicChat;
