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
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({});

  console.log('CURRENT USER', user)

  const getuserInfo = async () => {

    let info_id = !id ? userContext.user.id : id;
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

  useEffect(() => {

    console.log('COMPONENT MOUNTED')

    getuserInfo(id);

    return () => setUser({})
  }, []);

  return (
    <div>
      {user
        ? <Fragment>
          <ProfileTop {...user} />
          <Gallery id={user.id} type={!id ? 'current' : 'other'} />
        </Fragment>
        : null
      }
    </div>
  )
};
