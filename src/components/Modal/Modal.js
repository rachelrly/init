import React from 'react';
import ReactDOM from 'react-dom';
import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'
import ProfilePic from '../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import { buffTo64 } from '../Utils/Utils'

export default function Modal(props) {
    const onKeyDown = e => {
        console.log('key down ran in modal.js')
        if (e.keyCode === 27 || e.keyCode === 13 && !props.toggleOpen) {
            props.setToggleOpen(true)
        }
    }
    return ReactDOM.createPortal(
        <div className='Modal post-wrapper' tabIndex='0' >
            <div
                onClick={e => e.stopPropagation()}
                className='Modal__inner post-wrapper-flex'

            >
                <div className='header-and-exit' onKeyDown={(e) => onKeyDown(e)}>
                    <h2 className='post-title'>{props.post_title}</h2>
                    <div
                        className='burger-wrapper close-wrapper'
                        tabIndex='0'
                        role='button'
                        aria-label='navigation-menu-clickable'
                        onClick={() => props.setToggleOpen(!props.toggleOpen)}
                        onKeyDown={e => onKeyDown(e)}
                        aria-expanded='true'>

                        <span className='burger-line burger-line-one burger-line-open-one'></span>
                        <span className='burger-line burger-line-two burger-line-open-two'></span>
                        <span className='burger-line burger-line-three burger-line-open-three'></span>
                    </div>
                </div>
                <div className='project-image-wrapper' onClick={() => props.setToggleOpen(!props.toggleOpen)}>
                    <div className='project-image-wrapper-flex'>
                        <img
                            className='project-image'
                            alt={`project ${props.post_title}`}
                            src={`data:image/${props.post_image_type};base64,${buffTo64(props.post_image_file.data)}`}
                        />
                    </div>
                </div>
                <div className='project-content-wrapper'>
                    <div className='post-user-wrapper post-detail-wrapper'>
                        <div className='user-detail-wrapper'>
                            <ProfilePic className='post-profile-pic' />
                            <Link to={`/user/${props.user_id}`} className='post-name-wrapper'>
                                <p>{props.username}</p>
                            </Link>
                        </div>

                        <p className='desc'>{props.post_description}</p>
                    </div>
                    {props.post_live_link || props.post_repository
                        ? <div className='links-rendered-wrapper post-detail-wrapper'>
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
                        : null}
                    {props.tech_stack
                        ? <div className='post-detail-wrapper'>
                            <p>Tech stack: {props.tech_stack}</p>
                        </div>
                        : null}

                    <CommentForm post_id={props.id} comments={props.comments} setComments={(c) => { props.setComments(c) }} />
                    {props.comments.length ? props.comments.map(c => <Comment index={c.id} key={c.id} {...c} />) : null}
                </div>
            </div>
        </div>,
        document.getElementById('modal'),
    );
}
