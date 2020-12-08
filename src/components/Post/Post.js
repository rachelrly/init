import React, { useState, useEffect, Fragment } from 'react';
import Comment from '../Comment/Comment';
import InitContentApiService from '../../services/init-content-api-service';
import '../../css/Post.css';
import Modal from '../Modal/Modal';
import { buffTo64 } from '../Utils/Utils';

function Post(props) {
    const [comments, setComments] = useState([])
    const [toggleOpen, setToggleOpen] = useState(true)

    const getComments = async () => {
        const comm = await InitContentApiService.getPostComments(props.id)
        setComments(comm)
    };

    useEffect(() => {
        getComments()

    }, [])

    const onKeyDown = e => {
        console.log('key down ran in post.js')
        if (e.keyCode === 27 && !props.toggleOpen) {
            props.setToggleOpen(true)
        }
    }

    return (

        <Fragment>
            { props.post_image_file
                ? <div className='img-preview-wrapper'>
                    <img className='gallery-img'
                        onClick={() => setToggleOpen(!toggleOpen)}
                        alt={`project ${props.post_title}`}
                        src={`data:image/${props.post_image_type};base64,${buffTo64(props.post_image_file.data)}`}
                    />
                </div>
                : <div className='img-preview-wrapper'>
                    <h3>{props.post_title}</h3>
                </div>}

            {!toggleOpen
                ? <Modal onKeyDown={(e) => onKeyDown(e)} comments={comments} {...props} toggleOpen={toggleOpen} setToggleOpen={t => setToggleOpen(t)} setComments={c => setComments(c)} />
                : null}
        </Fragment>
    )
}

export default Post
