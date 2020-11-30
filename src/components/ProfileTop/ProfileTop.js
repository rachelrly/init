import React, { useContext } from 'react';
import UserContext from '../../contexts/userContext';
import ProfilePic from '../ProfilePic/ProfilePic';
import Vegeta from '../../pictures/VegetaProfile.jpg';

function ProfileTop() {
  const userContext = useContext(UserContext)
  let { user } = userContext

  return (
    <section>
      <div className='hex-wrapper'>
        <ProfilePic image={Vegeta} />
        <div className='p-wrapper'>
          <p className='p-filling'>post counter</p>
          <p className='p-filling'>follower counter</p>
          <p className='p-filling'>following counter</p>
        </div>
      </div>
      <div className='profile-wrapper'>
        <p className='p-item-top'>{user.username}</p>
        <p className='p-item-mid'>stack: {user.user_stack}</p>
        <p className='p-item-bot'>about: {user.about_user}</p>
      </div>
    </section>
  );
};

export default ProfileTop;