import React, { useState, useEffect } from 'react'
import ProfilePic from '../ProfilePic/ProfilePic'
import { Link } from 'react-router-dom';
import FollowService from '../../services/follow-service';
import '../../css/FollowList.css'
import { buffTo64 } from '../../components/Utils/Utils'

function FollowList(props) {
    const [toggleFollow, setToggleFollow] = useState(true)

    const [followedByUser, setFollowedByUser] = useState([])
    const [followingUser, setFollowingUser] = useState([])

    useEffect(() => {
        getFollow()

    }, [])

    console.log(followedByUser)

    
    const getFollow = async () => {
        try {
            const { followingUser, followedByUser } = await FollowService.getFollowLists()
            console.log('followed by user', followedByUser, 'following user', followingUser)
            setFollowedByUser(followedByUser)
            setFollowingUser(followingUser)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleUnfollow = async (id) => {
        try {
            const followers = await FollowService.unfollow(id)
            setFollowedByUser(followers)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFollow = async (id) => {
        try {
            const followers = await FollowService.follow(id)
            setFollowedByUser(followers)
        }
        catch (error) {
            console.log(error)
        }


    }

    const usersArr = toggleFollow ? followingUser : followedByUser

    const followList = usersArr.map((f, index) => {
        console.log(f)
        return (
            <div className='follow-item-wrapper' key={index} >
                <div className='follow-item-inner-wrapper'>
                    <div className='follow-wrapper-left'>
                        <Link to='/portfolio'>
                            <ProfilePic index={index} image={!f.img_file ? undefined : `data:image/${f.img_type};base64,${buffTo64(f.img_file.data)}`} />
                        </Link>
                        <div className='follow-name-wrapper'>
                            <h4>{f.username}</h4>
                            <p>{f.fullname}</p>
                        </div>
                    </div>
                    {toggleFollow
                        ? <button className='follow-button' onClick={() => handleFollow(f.id)}>Follow</button>
                        : <button className='follow-button' onClick={() => handleUnfollow(f.id)}>Unfollow</button>}
                </div>
            </div>
        )
    })

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
    )
}

export default FollowList
