import React, { useState } from 'react';
import InitContentApiService from '../../services/init-content-api-service';

function CommentForm(props) {
    /*This form allows users to post comments and handles that POST to the apu*/

    const [error, setError] = useState(null);
    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if (!text.length) {
            setError('Comment must not be empty');
            return null;
        };

        if (text.length > 200) {
            setError('Comment must be shorter than 200 characters');
            return null;
        };

        setText('');

        const response = await InitContentApiService.postComment(props.post_id, text);

        props.setComments(response);

    }

    return (
        <form className='comment-form' onSubmit={(e) => handleSubmit(e)}>

            {error &&
                <p role='alert'
                    className='error-message'
                    aria-live='assertive'>{error}</p>}
            <fieldset>
                <legend><h3>comment</h3></legend>
                <label />
                <textarea
                    className='comment-input'
                    type='text'
                    aria-required='true'
                    placeholder='Write a comment...'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
            </fieldset>
            <button
                type='submit'
                className='form-button'>
                Submit
            </button>

        </form >
    );
};

export default CommentForm;
