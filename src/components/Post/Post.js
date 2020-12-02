import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import { useParams } from "react-router";
import InitContentApiService from '../../services/init-content-api-service';
import '../../css/Post.css';
import ProfilePic from '../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';
import { buffTo64 } from '../Utils/Utils'

function Post(props) {
    const [comments, setComments] = useState([])
    const [toggleOpen, setToggleOpen] = useState(false)

    const getComments = async () => {
        const comm = await InitContentApiService.getPostComments(props.id)
        setComments(comm)
    };

    useEffect(() => {
        getComments()

    }, [])

    return (

        <div>
            {!toggleOpen
                ? props.post_image_file
                    ? <div className='img-preview-wrapper'><img className='gallery-img'
                        onClick={() => setToggleOpen(!toggleOpen)}
                        alt={`project ${props.post_title}`}
                        src={`data:image/${props.post_image_type};base64,${buffTo64(props.post_image_file.data)}`}
                    /></div>
                    : <div className='img-preview-wrapper'><h3>{props.post_title}</h3></div>
                : <div className='post-wrapper'>
                    <div className='post-detail-wrapper'>
                        <h2>{props.post_title}</h2>
                    </div>
                    <div className='placeholder' onClick={() => setToggleOpen(!toggleOpen)}>
                        <img
                            alt={`project ${props.post_title}`}
                            src={`data:image/${props.post_image_type};base64,${buffTo64(props.post_image_file.data)}`}
                        />
                    </div>

                    <div className='post-user-wrapper post-detail-wrapper'>
                        <div className='user-detail-wrapper'>
                            <ProfilePic className='post-profile-pic' />
                            <Link to={`/user/${props.user_id}`} className='post-name-wrapper'>
                                <p>{props.username}</p>
                            </Link>
                        </div>

                        <p className='desc'>{props.post_description}</p>
                    </div>
                    <div className='links-rendered-wrapper post-detail-wrapper'>
                        {props.post_live_link
                            ? <div className='link-wrapper'>
                                <a _target='blank' href={props.post_live_link} alt='view live project' className='link'>
                                    <p>Live Project</p>
                                </a>
                            </div>
                            : null}
                        {props.post_repository
                            ? <div className='link-wrapper'>
                                <a _target='blank' href={props.post_repository} alt='view projects repository' className='link'>
                                    <p>Front-end Repository</p>
                                </a>
                            </div>
                            : null}
                        {props.post_backEndRepository
                            ? <div className='link-wrapper'>
                                <a _target='blank' href={props.post_repository} alt='view projects repository' className='link'>
                                    <p>Back-end Repository</p>
                                </a>
                            </div>
                            : null}
                    </div>
                    <div className='post-detail-wrapper'>
                        <p>Tech stack: {props.tech_stack}</p>
                    </div>

                    <CommentForm post_id={props.id} comments={comments} setComments={(c) => { setComments(c) }} />
                    {comments.length ? comments.map(c => <Comment index={c.id} key={c.id} {...c} />) : null}
                </div>}
        </div>
    )
}

export default Post
