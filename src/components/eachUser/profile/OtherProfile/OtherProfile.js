import React, { useState, useContext, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Gallery from '../Gallery/Gallery';
import ProfileTop from '../ProfileTop/ProfileTop'
import UserContext from '../../../../contexts/userContext';
import config from '../../../../config';
import TokenService from '../../../../services/token-service';
import '../../../../css/Portfolio.css';


export default function Profile(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
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

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {

    getuserInfo(id);
    //get follow list and pass down

    return () => setUser({})
  }, []);
  console.log(user.NoPosts)
  return (

    <div>
      {user
        ? <Fragment>
          <ProfileTop {...user} />
          {user.NoPost == 0 ? null : <Gallery id={user.id} type='other' user={user} />}
        </Fragment>
        : null
      }
    </div>
  )
};
