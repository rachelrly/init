import React, { Fragment, useEffect, useState, useContext } from 'react';
import InitContentApiService from '../../../services/init-content-api-service';
import DisplayUser from '../../eachUser/profile/DisplayUser/DisplayUser';
import UserContext from '../../../contexts/userContext';
import Loading from '../../Loading/Loading';
import { useCheckandGetFollows } from '../../../hooks/useIsFollowing';

function AllUserList() {
  const [allUsers, setAllUsers] = useState([]);
  const { isLoading, setLoading } = useContext(UserContext);

  // useCheckandGetFollows();

  useEffect(() => {

    getUsers();

  }, [])

  const getUsers = async () => {
    const users = await InitContentApiService.getAllUsers();
    setAllUsers(users);
    setLoading(false);
  }

  const userList = allUsers.map((f, index) => {
    return (
      <DisplayUser key={index} index={index} {...f} />
    );
  });

  return (

    <Fragment>
      {isLoading
        ? <Loading />
        : <div className='follow-list all-user-wrapper'>
          {userList}
        </div>
      }
    </Fragment>


  )
}

export default AllUserList
