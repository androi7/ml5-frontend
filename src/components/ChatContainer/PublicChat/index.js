import React, { useState, useEffect, useContext, createRef } from 'react';
import socketIOClient from 'socket.io-client';
import ajax from '../../../lib/ajax';
import AuthContext from '../../../helper/AuthContext';
import UserList from '../UserList';
import ChatMessage from '../ChatMessage';
import MiniGallery from '../MiniGallery';
import { TextField, Button, Icon, IconButton, List } from '@material-ui/core';
import { makeStyles }  from '@material-ui/core/styles';
import { PhotoCamera } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    '&': {
      width: '60vw',
      paddingLeft: 40,
      margin: '0 auto',
      position: 'fixed',
      bottom: 80,
      left: '50vw',
      marginLeft: '-30vw'
    },
  },
  listRoot: {
    width: '100%',
    maxWidth: 600,
    minWidth: 200,
    margin: '0 auto',
    maxHeight: '60vh',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.default,
  },
  input: {
    borderRadius: 4,
    width: '70%',
    height: 50,
    marginRight: 10
  },
  button: {
    width: '20%',
    height: 55
  }
}));

const ENDPOINT = "http://localhost:3001";

const PublicChat = props => {

  const classes = useStyles();
  const scrollMsg = createRef();

  const [token, setToken] = useState('');
  const [message, setMessage] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

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

  const handleUnmountGallery = () => {
    setShowImages(false);
  }

  const getImageSource = (img) => {
    setImageSrc(img);
  };

  useEffect(() => {
    // not perfect ....
    scrollMsg.current.scrollTop = scrollMsg.current.scrollHeight;
  });

  return (
    <div>
      {/*token ? <UserList token={token} /> : null*/}

      <List className={classes.listRoot} ref={scrollMsg}>
        {messageList.map((m,i) => {
          return <ChatMessage key={i} username={m.user.username} message={m.message} image={m.image} type={m.type} />;})
        }
      </List>


      {showImages && <MiniGallery img={getImageSource} removeGallery={handleUnmountGallery} />}
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField id="outlined-basic"
                   className={classes.input}
                   label="Chat"
                   variant="outlined"
                   onChange={handleInput}
                   inputRef={inputMessage}
                   />
        <IconButton color="primary"
                    style={{position: 'absolute', zIndex: 100, height: 32,width: 32, right: '30%'}}
                    aria-label="upload picture"
                    component="span"
                    onClick={handleUploadImage}
                    >
          <PhotoCamera />
        </IconButton>
        <Button variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                >
            Send
        </Button>
      </form>
    </div>
  );
};


export default PublicChat;
