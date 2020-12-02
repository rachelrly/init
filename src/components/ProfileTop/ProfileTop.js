import React, { useContext } from 'react';
import UserContext from '../../contexts/userContext';
import ProfilePic from '../ProfilePic/ProfilePic';

function ProfileTop() {
  const userContext = useContext(UserContext)
  let { user } = userContext

  return (
    <div className='profile-top-wrapper'>
      <div className='profile-info-wrapper'>
        <ProfilePic />

        <p className='p-filling'>posts</p>
        <p className='p-filling'>followers</p>
        <p className='p-filling'>following</p>

      </div>
      <div className='profile-wrapper'>
        <p className='p-item-top'>{user.username}</p>
        <p className='p-item-mid'>stack: {user.user_stack}</p>
        <p className='p-item-bot'>about: {user.about_user}</p>
      </div>
    </div >
  );
};

export default ProfileTop;