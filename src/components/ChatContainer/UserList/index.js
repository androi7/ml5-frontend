const UserList = props => {



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

export default UserList;
