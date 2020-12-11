import React, { useState, useEffect, useContext } from 'react';
import '../../../../css/FollowList.css';
import UserContext from '../../../../contexts/userContext';
import DisplayUser from '../DisplayUser/DisplayUser';

function FollowList(props) {
    const [toggleFollow, setToggleFollow] = useState(true);

    const { user } = useContext(UserContext);
    const { followers, following } = user;

    const usersArr = toggleFollow ? followers : following;

    const followList = usersArr.map((f, index) => {
        return (
            <DisplayUser {...f} key={index} index={index} />
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
