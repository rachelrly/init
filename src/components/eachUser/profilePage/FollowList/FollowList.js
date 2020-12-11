import React, { useState, useEffect, useContext } from 'react';
import ProfilePic from '../../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import FollowService from '../../../../services/follow-service';
import '../../../../css/FollowList.css';
import { buffTo64 } from '../../../Utils/Utils';
import UserContext from '../../../../contexts/userContext';

function FollowList(props) {
    const [toggleFollow, setToggleFollow] = useState(true);

    const [followedByUser, setFollowedByUser] = useState([]);
    const [followingUser, setFollowingUser] = useState([]);

    const { user } = useContext(UserContext);
    console.log('USER', user)
    useEffect(() => {
        getFollow();

    }, []);

    const getFollow = async () => {
        try {
            const { following, followers } = user;
            setFollowedByUser(following);
            setFollowingUser(followers);
        }
        catch (error) {
            console.error(error);
        };
    };

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

    const usersArr = toggleFollow ? followingUser : followedByUser;

    const isFollowing = id => followedByUser.find(u => u.id === id);

    const followList = usersArr.map((f, index) => {
        return (
            <div className='follow-item-wrapper' key={index} >
                <div className='follow-item-inner-wrapper'>
                    <div className='follow-wrapper-left'>
                        <Link to={`/user/${f.id}`}>
                            <ProfilePic index={index} image={!f.img_file ? undefined : `data:image/${f.img_type};base64,${buffTo64(f.img_file.data)}`} />
                        </Link>

                        <div className='follow-name-wrapper'>
                            <Link to={`/user/${f.id}`}>
                                <h4>{f.username}</h4>
                            </Link>
                            <p>{f.fullname}</p>
                        </div>

                    </div>
                    {!isFollowing(f.id)
                        ? <button className='follow-button' onClick={() => handleFollow(f.id)}>Follow</button>
                        : <button className='follow-button' onClick={() => handleUnfollow(f.id)}>Unfollow</button>}
                </div>
            </div>
        );
    });

    return (
        <section>
            <div className='toggle-button-wrapper'>
                <button className={toggleFollow ? 'active-toggle toggle-button' : 'toggle-button'} onClick={() => setToggleFollow(true)}>Followers</button>
                <button className={!toggleFollow ? 'active-toggle toggle-button' : 'toggle-button'} onClick={() => setToggleFollow(false)}>Following</button>
            </div>
            <div className='follow-list'>
                {followList}
            </div>
        </section>
    );
};

export default FollowList;
