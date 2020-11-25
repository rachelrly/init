import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';

function Comment(props) {
    const d = new Date(props.date_created)
    return (
        <div className='comment-wrapper'>
            <div className='avatar-date-comment-wrapper'>
                <p className='temp-user-avatar'>⬢</p>
                <p className='comment-date-created'>{format(d, 'MMM dd yyyy')}</p>
            </div>
            <div className='comment-data-wrapper'>
                <Link to={`/user/${props.user_id}`}>
                    <span className='comment-username'>{props.username}</span>
                </Link>
                <span className='comment-body'>{props.text}</span>
            </div>

        </div >
    )
}

export default Comment
