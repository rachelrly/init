import React, { useState, useContext, useEffect } from 'react';
import ProfilePic from '../../ProfilePic/ProfilePic';
import { buffTo64 } from '../../../Utils/Utils';

function ProfileTop(props) {
  /*This component renders the top of each user's portfolio page*/

  return (
    <div className='profile-top-wrapper profile-info-wrapper'>

      <div className='profile-container profile-info-user'>
        <ProfilePic image={!props.img_file ? undefined : `data:image/${props.img_type};base64,${buffTo64(props.img_file.data)}`} />
        <h2 className='p-item-top'>{props.username}</h2>
      </div>
      <div className='profile-container profile-info-count'>
        <p className='p-filling' ><span>{props.NoPost}</span>Posts</p>
        <p className='p-filling' ><span>{props.FBU}</span>Followers</p>
        <p className='p-filling' ><span>{props.UF}</span>Following</p>
      </div>

    </div >
  );
};

export default ProfileTop;