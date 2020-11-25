import React, { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';
import { useParams } from "react-router";
import InitContentApiService from '../../services/init-content-api-service';
import '../../css/Post.css';
import ProfilePic from '../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';

function Post() {
    let { id } = useParams()
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})

    const getComments = async () => {
        const comm = await InitContentApiService.getPostComments(id)
        setComments(comm)
    };

    const getPost = async () => {
        const p = await InitContentApiService.getPost(id)
        setPost(p)
    }

    useEffect(() => {
        getComments()
        getPost()
    }, [])

    return (
        <section className='post-wrapper'>
            <div className='post-detail-wrapper'>
                <h2>{post.title}</h2>
            </div>
            <div className='placeholder'>
                <h1>PLACEHOLDER</h1>
            </div>

            <div className='post-user-wrapper post-detail-wrapper'>
                <div className='user-detail-wrapper'>
                    <ProfilePic className='post-profile-pic' />
                    <Link to={`/user/${post.user_id}`} className='post-name-wrapper'>
                        <p>{post.username}</p>
                    </Link>
                </div>

                <p className='desc'>{post.description}</p>
            </div>
            <div className='links-rendered-wrapper post-detail-wrapper'>
                {post.live_link
                    ? <div className='link-wrapper'>
                        <a _target='blank' href={post.live_link} alt='view live project' className='link'>
                            <p>Live Project</p>
                        </a>
                    </div>
                    : null}
                {post.repository
                    ? <div className='link-wrapper'>
                        <a _target='blank' href={post.repository} alt='view projects repository' className='link'>
                            <p>Front-end Repository</p>
                        </a>
                    </div>
                    : null}
                {post.backEndRepository
                    ? <div className='link-wrapper'>
                        <a _target='blank' href={post.repository} alt='view projects repository' className='link'>
                            <p>Back-end Repository</p>
                        </a>
                    </div>
                    : null}
            </div>
            <div className='post-detail-wrapper'>
                <p>Tech stack: {post.tech_stack}</p>
            </div>

            <CommentForm post_id={id} comments={comments} setComments={(c) => { setComments(c) }} />
            {comments.length ? comments.map(c => <Comment key={c.id} {...c} />) : null}
        </section>
    )
}

export default Post
