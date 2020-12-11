import React, { useEffect, useState } from 'react';
import InitContentApiService from '../../../services/init-content-api-service';
import ProfilePic from '../../eachUser/ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import FollowService from '../../../services/follow-service';
import { buffTo64 } from '../../Utils/Utils';

function AllUserList() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers();

  }, [])

  const getUsers = async () => {
    const users = await InitContentApiService.getAllUsers();
    setAllUsers(users);
  }

  const handleUnfollow = async (id) => {
    try {
      await FollowService.unfollow(id);
    }
    catch (error) {
      console.error(error);
    };
  };

  const handleFollow = async (id) => {
    try {
      await FollowService.follow(id);
    }
    catch (error) {
      console.error(error);
    };
  };


  // const isFollowing = id => followedByUser.find(u => u.id === id);

  const userList = allUsers.map((f, index) => {
    return (
      <div className='follow-item-wrapper' key={index} >
        <div className='follow-item-inner-wrapper'>
          <div className='follow-wrapper-left'>
            <Link to={`/user/${f.id}`}>
              <ProfilePic index={index} image={!f.img_file ? undefined : `data:image/${f.img_type};base64,${buffTo64(f.img_file.data)}`} />
            </Link>

            <div className='follow-name-wrapper'>
              <Link to={`/user/${f.id}`}>
                <h4>{f.username}</h4>
              </Link>
              <p>{f.fullname}</p>
            </div>

          </div>
          {/* {!isFollowing(f.id)
            ?  */}
          <button className='follow-button' onClick={() => handleFollow(f.id)}>Follow</button>
          {/* : <button className='follow-button' onClick={() => handleUnfollow(f.id)}>Unfollow</button>} */}
        </div>
      </div>
    );
  });

  return (

    <div className='follow-list all-user-wrapper'>
      {userList}
    </div>

  )
}

export default AllUserList
