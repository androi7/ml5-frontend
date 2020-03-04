import React, { Fragment, useEffect, useState } from 'react';
import ajax from '../../../lib/ajax';

const UserList = props => {

  const [userList, setUserList] = useState([]);

  const loadParticipants = () => {
    if (props.token) {
      ajax.getParticipants(props.token)
        .then(res => {
          res.data.forEach(userData => setUserList(userList => [...userList, {name: userData.name, id: userData.id}]));
        })
        .catch(err => console.warn('userlist failed', err));
    }
  };

  useEffect(loadParticipants, []);

  return (
    <Fragment>
      <ul>
        {userList.map(u => {
        return <li key={u.id} style={{listStyleType: "none"}}>{u.name}</li>}
        )}
      </ul>
    </Fragment>
  );
}

export default UserList;
