import React, { useState, useContext, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Gallery from '../Gallery/Gallery';
import ProfileTop from '../ProfileTop/ProfileTop'
import UserContext from '../../../../contexts/userContext';
import config from '../../../../config';
import TokenService from '../../../../services/token-service';
import '../../../../css/Portfolio.css';
import FollowService from '../../../../services/follow-service';
import FollowList from '../FollowList/FollowList';


export default function Profile(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [content, setContent] = useState('gallery');


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
        );

      setUser(userInfo);

      const { followingUser, followedByUser } = await FollowService.getFollowListWithUserId(id)
      setFollowers(followingUser);
      setFollowing(followedByUser);

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setContent('gallery');
    getuserInfo(id);

    return () => {
      setUser({})
      setFollowing([])
      setFollowers([])
    }
  }, [id]);
  console.log(user)

  return (
    <div>
      {following.length || user.UFB
        ? <Fragment>
          <ProfileTop {...user} setContent={c => setContent(c)} followersCount={user.UF} followingCount={user.FBU} />
          {content === 'gallery'
            ? <Fragment>{user.NoPost == 0 ? <p>This user has no posts.</p> : <Gallery id={user.id} type='other' user={user} />}</Fragment>
            : <FollowList type={content} following={following} followers={followers} />}
        </Fragment>
        : null
      }
    </div>
  )
};
