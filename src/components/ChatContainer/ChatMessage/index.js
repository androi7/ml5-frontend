import React from 'react';

const ChatMessage = props => {

  return (
    <div>
      <h2>{props.username}</h2>
      <p>{props.message}</p>
    </div>
  );
};

export default ChatMessage;
