import React, { useState, useContext } from 'react'
import InitContentContext from '../../contexts/initContentContext'
import InitContentApiService from '../../services/init-content-api-service'
import ProjectUpload from '../ProjectUpload/ProjectUpload'
import '../../css/PhotoUpload.css'


function PostForm(props) {
    const [error, setError] = useState(null)
    const context = useContext(InitContentContext)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const { setProjectData } = context

        if (ev.target.post_description.length > 200) {
            setError('Project description must be less than 200 characters.')
        }

        InitContentApiService.postInitProject(ev.target)
            .then(() => props.history.push('/portfolio'))
            .then(setProjectData())
            .catch(error => {
                setError(error)
            })
    }

    return (
        <form
            className='project-form'
            onSubmit={(e) => handleSubmit(e)}
            encType='multipart/form-data'
        >
            <ProjectUpload setError={(e) => setError(e)} />

            {error && <p>{error.message}</p>}
            <div className='image-info'>
                <span>.png .jpg .jpeg .gif up to 1MB</span>
                <span>image required</span>
            </div>
            <div className='post-input-wrapper'>
                <div>

                    <label
                        htmlFor='init-project-title-input'
                        aria-label='init-project-title-input'
                        className='project-form-label'
                    >title</label>
                    <input
                        id='init-project-title-input'
                        name='post_title'
                        type='text'
                        className='project-form-input'
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>
                <div>
                    <label
                        htmlFor='init-project-description-input'
                        aria-label='init-project-description-input'
                        className='project-form-label'
                    >description</label>
                    <input
                        id='init-project-description-input'
                        name='post_description'
                        type='text'
                        className='project-form-input'
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>
                <div>
                    <label
                        htmlFor='init-project-live-link-input'
                        aria-label='init-project-live-link-input'
                        className='project-form-label'
                    >repository</label>
                    <input
                        id='init-project-live-link-input'
                        name='post_live_link'
                        type='text'
                        className='project-form-input'
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>
                <div>
                    <label
                        htmlFor='init-project-repository-input'
                        aria-label='init-project-repository-input'
                        className='project-form-label'>live site</label>
                    <input
                        id='init-project-repository-input'
                        name='post_repository'
                        type='text'
                        className='project-form-input'
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>

                <button
                    type='submit'
                    className='project-form-submit-button form-button'>
                    upload
                    </button>
            </div>
        </form >
    )
}


export default PostForm