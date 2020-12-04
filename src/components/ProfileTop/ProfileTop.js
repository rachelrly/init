import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../contexts/userContext';
import ProfilePic from '../ProfilePic/ProfilePic';
import config from '../../config';
import TokenService from '../../services/token-service';

function ProfileTop() {
  const userContext = useContext(UserContext)
  //let { user } = userContext
  const [user, setUser] = useState({})
  const { id } = useParams()
  // user = id === undefined ? (return user info) : user

  useEffect(() => {
    getuserInfo()
    
  }, [])
  
  const getuserInfo = async () => {
    try {
          const userInfo = await fetch(`${config.API_ENDPOINT}/user/user/${id}`, {
            method: "GET",
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            )
            console.log(userInfo, "what's is this info?")
            
            setUser(userInfo)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='profile-top-wrapper'>
      {user ? <><div className='profile-info-wrapper'>
        <ProfilePic />

        <p className='p-filling' key={user}>Post {user.NoPost}</p>
        <p className='p-filling' >Followers {user.FBU}</p>
        <p className='p-filling' >Following {user.UF}</p>

      </div>
      <div className='profile-wrapper'>
        <p className='p-item-top'>{user.username}</p>
        <p className='p-item-mid'>stack: {user.user_stack}</p>
        <p className='p-item-bot'>about: {user.about_user}</p>
      </div>
      </> : null}
    </div >
  );
};

export default ProfileTop;