import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ProfilePic from '../ProfilePic/ProfilePic';
import { buffTo64 } from '../../components/Utils/Utils';

function Comment(props) {
    /*renders each individual comment*/
    const d = new Date(props.date_created);

    return (
        <div className='comment-wrapper'>
            <div className='avatar-date-comment-wrapper'>
                <ProfilePic className='comment-profile-pic' index={props.index} image={!props.img_file ? undefined : `data:image/${props.img_type};base64,${buffTo64(props.img_file.data)}`} />
                <p className='comment-date-created'>{format(d, 'MMM dd yyyy')}</p>
            </div>
            <div className='comment-data-wrapper'>
                <Link to={`/user/${props.user_id}`}>
                    <span className='comment-username'>{props.username}</span>
                </Link>
                <span className='comment-body'>{props.text}</span>
            </div>
        </div >
    );
};

export default Comment;
