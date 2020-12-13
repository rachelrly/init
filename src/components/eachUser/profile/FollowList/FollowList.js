import React, { useState, useEffect, useContext, Fragment } from 'react';
import '../../../../css/FollowList.css';
import UserContext from '../../../../contexts/userContext';
import DisplayUser from '../DisplayUser/DisplayUser';
import Loading from '../../../Loading/Loading';

function FollowList(props) {
    const usersArr = props.type === 'followers' ? props.followers : props.following;

    const { isLoading, setLoading } = useContext(UserContext);

    if (isLoading && usersArr.length) {
        setLoading(false)
    }


    const followList = usersArr.map((f, index) => {
        return (
            <DisplayUser {...f} key={index} index={index} />
        );
    });

    return (
        <Fragment>
            {isLoading
                ? <Loading />
                : <div className='follow-wrapper'>
                    {!usersArr
                        ? <p>This user has no {props.type}</p>
                        : <div className='follow-list'>
                            {followList}
                        </div>}
                </div>}
        </Fragment>
    );
};

export default FollowList;
