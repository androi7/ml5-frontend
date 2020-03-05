import React, { useEffect } from 'react';

const ChatMessage = props => {

  let messageBox;

    if (props.type === 'img') {
      messageBox = <img src={props.image} alt="" style={{width: 200}}/>;
    } else if (props.type === 'txt') {
      messageBox = <p>{props.message}</p>;
    } else {
      messageBox = null;
    }


  return (
    <div>
      <h2>{props.username}</h2>
      {messageBox}
    </div>
  );
};

export default ChatMessage;
