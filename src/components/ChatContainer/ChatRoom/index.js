import React from 'react';
import { Link } from 'react-router-dom';

const ChatRoom = props => {

  return (
    <div>
      <Link to="/chat/privateChat">
        Private Chat
      </Link>
      <Link to="/chat/publicChat">
        Public Chat
      </Link>
    </div>
  );
};

export default ChatRoom;
