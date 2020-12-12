import React, { useContext } from 'react';
import ProfilePic from '../../ProfilePic/ProfilePic';
import { buffTo64 } from '../../../Utils/Utils';
import UserContext from '../../../../contexts/userContext';

function ProfileTop(props) {
  /*This component renders the top of each user's portfolio page*/
  //const { user } = useContext(UserContext)
  return (
    <div className='profile-top-wrapper profile-info-wrapper'>

      <div className='profile-container profile-info-user'>
        <ProfilePic image={!props.img_file ? undefined : `data:image/${props.img_type};base64,${buffTo64(props.img_file.data)}`} />
        <h2 className='p-item-top'>{props.username}</h2>
      </div>
      <div className='profile-container profile-info-count'>
        <button onClick={() => props.setContent('gallery')}>{props.NoPost} Posts</button>
        <button onClick={() => props.setContent('followers')} >{props.followersCount} Followers</button>
        <button onClick={() => props.setContent('following')}>{props.followingCount} Following</button>
      </div>

    </div >
  );
};

export default ProfileTop;