import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../../../contexts/userContext';
import ProfilePic from '../../ProfilePic/ProfilePic';
import config from '../../../../config';
import TokenService from '../../../../services/token-service';
import { buffTo64 } from '../../../Utils/Utils';

function ProfileTop() {
  /*This component renders the top of each user's portfolio page*/

  const userContext = useContext(UserContext);
  const [user, setUser] = useState({});
  let { id } = useParams();

  useEffect(() => {
    getuserInfo();

  }, []);

  const getuserInfo = async () => {
    const info_id = !id ? userContext.user.id : id;
    try {
      const userInfo = await fetch(`${config.API_ENDPOINT}/user/user/${info_id}`, {
        method: "GET",
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(event => Promise.reject(event))
            : res.json()
        );

      setUser(userInfo);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='profile-top-wrapper profile-info-wrapper'>
      {user ?
        <>
          <div className='profile-container profile-info-user'>
            <ProfilePic image={!user.img_file ? undefined : `data:image/${user.img_type};base64,${buffTo64(user.img_file.data)}`} />
            <h2 className='p-item-top'>{user.username}</h2>
          </div>
          <div className='profile-container profile-info-count'>
            <p className='p-filling' key={user}><span>{user.NoPost}</span>Posts</p>
            <p className='p-filling' ><span>{user.FBU}</span>Followers</p>
            <p className='p-filling' ><span>{user.UF}</span>Following</p>
          </div>
        </> : null}
    </div >
  );
};

export default ProfileTop;