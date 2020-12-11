import React from 'react'
import ProfilePic from '../../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import FollowService from '../../../../services/follow-service';
import '../../css/FollowList.css';
import { buffTo64 } from '../../../Utils/Utils';

function DisplayUser(props) {

  const handleUnfollow = async (id) => {
    try {
      const followers = await FollowService.unfollow(id);
      setFollowedByUser(followers);
    }
    catch (error) {
      console.error(error);
    };
  };

  const handleFollow = async (id) => {
    try {
      const followers = await FollowService.follow(id);
      setFollowedByUser(followers);
    }
    catch (error) {
      console.error(error);
    };
  };

  const isFollowing = id => props.followedByUser.find(u => u.id === id);

  return (
    <div className='follow-item-wrapper' >
      <div className='follow-item-inner-wrapper'>
        <div className='follow-wrapper-left'>
          <Link to={`/user/${props.id}`}>
            <ProfilePic index={props.index} image={!props.img_file ? undefined : `data:image/${props.img_type};base64,${buffTo64(props.img_file.data)}`} />
          </Link>
          <div className='follow-name-wrapper'>
            <Link to={`/user/${props.id}`}>
              <h4>{props.username}</h4>
              <p>{props.fullname}</p>
            </Link>
          </div>
        </div>
        {!isFollowing(props.id)
          ? <button className='follow-button' onClick={() => handleFollow(props.id)}>Follow</button>
          : <button className='follow-button' onClick={() => handleUnfollow(props.id)}>Unfollow</button>}
      </div>
    </div>
  );
};

export default DisplayUser;
