import React, { useState, useContext, useEffect, Fragment } from 'react';
import Gallery from '../Gallery/Gallery';
import ProfileTop from '../ProfileTop/ProfileTop'
import UserContext from '../../../../contexts/userContext';
import config from '../../../../config';
import TokenService from '../../../../services/token-service';
import '../../../../css/Portfolio.css';
import FollowList from '../../profile/FollowList/FollowList';
import Loading from '../../../Loading/Loading';


export default function Profile(props) {

  const userContext = useContext(UserContext);
  const [user, setUser] = useState({});
  const [content, setContent] = useState('gallery')

  const getuserInfo = async () => {

    try {
      const userInfo = await fetch(`${config.API_ENDPOINT}/user/user/${userContext.user.id}`, {
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

  useEffect(() => {

    getuserInfo(userContext.user.id);

    return () => setUser({})
  }, []);


  return (
    <Fragment>
      <ProfileTop {...user} setContent={(g) => setContent(g)} followingCount={userContext.user.following ? userContext.user.following.length : user.FBU} followersCount={userContext.user.followers ? userContext.user.followers.length : user.UF} />
      {content === 'gallery'
        ? <Gallery type='current' user={user} />
        : <FollowList type={content} followers={userContext.user.followers} following={userContext.user.following} />
      }
    </Fragment>
  )
};
