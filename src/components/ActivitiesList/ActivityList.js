import React, { Fragment, useState, useEffect } from 'react';
import ProfilePic from '../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import ActivitiesService from '../../services/activities-service';
import { buffTo64 } from '../../components/Utils/Utils';
import FollowService from '../../services/follow-service';

function ActivitiesList(props) {
    const [toggleFollow, setToggleFollow] = useState(true)

    const [unreadFollowingUser, setUnreadFollowingUser] = useState([])
    const [unreadCommentsForUser, setUnreadCommentsForUser] = useState([])

    useEffect(() => {
        getActivities()

    }, [])

    const getActivities = async () => {
        try {
            const { unreadFollowingUser, unreadCommentsForUser } = await ActivitiesService.getUnreadActivity()
            setUnreadFollowingUser(unreadFollowingUser)
            setUnreadCommentsForUser(unreadCommentsForUser)
            console.log(unreadFollowingUser, unreadCommentsForUser)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleUnfollow = async (id) => {
        try {
            const followers = await FollowService.unfollow(id)
            // setFollowedByUser(followers)
            return followers
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFollow = async (id) => {
        try {
            const followers = await FollowService.follow(id)
            // setFollowedByUser(followers)
            return followers
        }
        catch (error) {
            console.log(error)
        }
    }

    
    //needed params:
    // 1. user avatar
    // 2. username
    // 3a. activity message
    // 3b. timestamp
    // 4. follow/unfollow button
    // 5. post title
    // 6. post photo
    const mergedActivities = unreadFollowingUser.concat(unreadCommentsForUser)
    const notifications = mergedActivities.sort(function(a, b){
        return a.date_created + b.date_created;
    });
    const notificationsList = notifications.map((a, idx) =>{
        return (
            
            <div className='follow-item-wrapper' key={idx} >
                <div className='follow-item-inner-wrapper'>
                    <div className='follow-wrapper-left'>
                        <Link to='/portfolio'>
                            <ProfilePic index={idx} image={!a.img_file ? undefined : `data:image/${a.img_type};base64,${buffTo64(a.img_file.data)}`} />
                        </Link>
                        <div className='follow-name-wrapper'>
                            <p><strong>{a.username} </strong>
        {!a.text ? <span>{}has started following you.</span> : <span>has commented on {a.post_title}</span>}</p>
                        </div>
                    </div>
                    {toggleFollow
                        ? <button className='follow-button' onClick={() => handleFollow(a.id)}>Follow</button>
                        : <button className='follow-button' onClick={() => handleUnfollow(a.id)}>Unfollow</button>}
                </div>
            </div>
        )
    })


    return (
         <section>
             <h2>activityNotifications</h2>
             <div className='notifications-list'>
                {notificationsList}
             </div>
         </section>
    )

}

export default ActivitiesList