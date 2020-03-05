import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const ChatRoom = props => {

  return (
    <div>
      {/*<Link to="/chat/privateChat">
        Private Chat
      </Link>
      <Link to="/chat/publicChat">
        Public Chat
      </Link>*/}
      <Redirect to="/chat/publicChat" />
    </div>
  );
};

export default ChatRoom;
