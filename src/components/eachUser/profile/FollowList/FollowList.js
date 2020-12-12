import React, { useState, useEffect, useContext } from 'react';
import '../../../../css/FollowList.css';
import UserContext from '../../../../contexts/userContext';
import DisplayUser from '../DisplayUser/DisplayUser';
import FollowService from '../../../../services/follow-service';

function FollowList(props) {
    const usersArr = props.type === 'followers' ? props.followers : props.following;



    const followList = usersArr.map((f, index) => {
        return (
            <DisplayUser {...f} key={index} index={index} />
        );
    });

    return (
        <div className='follow-wrapper'>
            {!usersArr
                ? <p>This user has no {props.type}</p>
                : <div className='follow-list'>
                    {followList}
                </div>}
        </div>
    );
};

export default FollowList;
