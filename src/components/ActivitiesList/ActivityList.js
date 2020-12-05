import React, { Fragment, useState, useEffect } from 'react';
import ProfilePic from '../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import ActivitiesService from '../../services/activities-service';
import { buffTo64 } from '../../components/Utils/Utils';
import FollowService from '../../services/follow-service';
import '../../css/FollowList.css';

function ActivitiesList() {
    /*This component shows users notifications based on who has commented on their posts and 
    who has recently followed them*/

    const [followedByUser, setFollowedByUser] = useState([]);
    const [unreadFollowingUser, setUnreadFollowingUser] = useState([]);
    const [unreadCommentsForUser, setUnreadCommentsForUser] = useState([]);

    useEffect(() => {
        getActivities();

    }, []);

    const getActivities = async () => {
        try {
            const { followedByUser, unreadFollowingUser, unreadCommentsForUser } = await ActivitiesService.getUnreadActivity();
            setFollowedByUser(followedByUser);
            setUnreadFollowingUser(unreadFollowingUser);
            setUnreadCommentsForUser(unreadCommentsForUser);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleUnfollow = async (id) => {
        try {
            const followers = await FollowService.unfollow(id);
            setFollowedByUser(followers);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleFollow = async (id) => {
        try {
            const followers = await FollowService.follow(id);
            setFollowedByUser(followers);
        }
        catch (error) {
            console.error(error);
        }
    }

    const isFollowing = id => followedByUser.find(u => u.id === id);
    const mergedActivities = unreadFollowingUser.concat(unreadCommentsForUser);

    const notifications = mergedActivities.sort(function (a, b) {
        return a.date_created + b.date_created;
    });

    const notificationsList = notifications.map((a, idx) => {
        return (

            <div className='activity-item-wrapper' key={idx} >

                <Link to='/portfolio'>
                    <ProfilePic index={idx} image={!a.img_file ? undefined : `data:image/${a.img_type};base64,${buffTo64(a.img_file.data)}`} />
                </Link>
                <div className='activity-message-wrapper'>
                    <p><strong>{a.username} </strong>
                        {!a.text ? <span>has started following you.</span> : <span>has commented on {a.post_title}</span>}</p>
                </div>

                {!isFollowing(a.id)
                    ? <button className='activity-button' onClick={() => handleFollow(a.id)}>Follow</button>
                    : <button className='activity-button' onClick={() => handleUnfollow(a.id)}>Unfollow</button>}

            </div>
        )
    })


    return (
        <div className='notifications-wrapper'>
            <h2>activityNotifications</h2>
            <div className='notifications-list'>
                {notificationsList}
            </div>
        </div>
    );

};

export default ActivitiesList;