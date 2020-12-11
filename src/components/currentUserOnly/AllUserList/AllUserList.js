import React, { useEffect, useState } from 'react';
import InitContentApiService from '../../../services/init-content-api-service';
import FollowService from '../../../services/follow-service';
import DisplayUser from '../../eachUser/profilePage/DisplayUser/DisplayUser';

function AllUserList() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers();

  }, [])

  const getUsers = async () => {
    const users = await InitContentApiService.getAllUsers();
    setAllUsers(users);
  }

  const userList = allUsers.map((f, index) => {
    return (
      <DisplayUser key={index} index={index} {...f} />
    );
  });

  return (

    <div className='follow-list all-user-wrapper'>
      {userList}
    </div>

  )
}

export default AllUserList
