import React, { useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ChatMessage = ({ username, message, image, type }) => {

  const classes = useStyles();
  let messageBox;

  if (type === 'img') {
    messageBox = <img src={image} alt="" style={{width: 200}}/>;
  } else if (type === 'txt') {
    messageBox = (
      <ListItemText
        primary={message}

        secondary={
          <Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {username}
            </Typography>
            {" — time???"}
          </Fragment>
        }
      />
  );
  } else {
    messageBox = null;
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {/*<Avatar>{username[0]}</Avatar>*/}
        <Avatar />
      </ListItemAvatar>
      {messageBox}
    </ListItem>
  );
};

export default ChatMessage;
