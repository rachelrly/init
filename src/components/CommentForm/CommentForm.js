import React, { useState } from 'react'
import InitContentApiService from '../../services/init-content-api-service';

function CommentForm(props) {
    const [error, setError] = useState(null)
    const [text, setText] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        if (!text.length) {
            setError('Comment must not be empty')
            return null;
        }

        setText('')
        const response = await InitContentApiService.postComment(props.post_id, text)
        props.setComments(response)

    }

    return (
        <form className='comment-form' onSubmit={(e) => handleSubmit(e)}>

            {error && <div role='alert'
                className='error-message'
                aria-live='assertive'>
                <p>{error}</p>
            </div>}
            <label />
            <textarea
                className='comment-input'
                type='text'
                aria-required='true'
                autoComplete='current-password'
                placeholder='Write a comment...'
                value={text}
                onChange={(e) => setText(e.target.value)} />
            <button
                type='submit'
                className='form-button'>
                Submit
            </button>

        </form >
    )
}

export default CommentForm
