import React, { useState, useContext } from 'react'
import InitContentContext from '../../contexts/initContentContext'
import InitContentApiService from '../../services/init-content-api-service'
import ProjectUpload from '../ProjectUpload/ProjectUpload'
// import '../../css/AvatarForm.css'


function PostForm(props) {
    const [error, setError] = useState(null)
    const context = useContext(InitContentContext)
    const handleSubmit = (ev) => {
        ev.preventDefault()
        const { setProjectData } = context

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
            <ProjectUpload />
            <div className='post-input-wrapper'>
                <label
                    htmlFor='init-project-title-input'
                    aria-label='init-project-title-input'
                    className='project-form-label'
                />
                <input
                    id='init-project-title-input'
                    name='post_title'
                    type='text'
                    className='project-form-input'
                    placeholder='Enter a title for your project'
                    aria-required='true'
                    autoComplete='off'
                >
                </input>
                <label
                    htmlFor='init-project-description-input'
                    aria-label='init-project-description-input'
                    className='project-form-label'
                />
                <input
                    id='init-project-description-input'
                    name='post_description'
                    type='text'
                    className='project-form-input'
                    placeholder='Enter a description for your project'
                    aria-required='true'
                    autoComplete='off'
                >
                </input>
                <label
                    htmlFor='init-project-live-link-input'
                    aria-label='init-project-live-link-input'
                    className='project-form-label'
                />
                <input
                    id='init-project-live-link-input'
                    name='post_live_link'
                    type='text'
                    className='project-form-input'
                    placeholder='Enter a url for your live project'
                    aria-required='true'
                    autoComplete='off'
                >
                </input>
                <label
                    htmlFor='init-project-repository-input'
                    aria-label='init-project-repository-input'
                    className='project-form-label'
                />
                <input
                    id='init-project-repository-input'
                    name='post_repository'
                    type='text'
                    className='project-form-input'
                    placeholder='Enter a url for your live project'
                    aria-required='true'
                    autoComplete='off'
                >
                </input>
                <label
                    htmlFor='init-project-tech-stack-input'
                    aria-label='init-project-tech-stack-input'
                    className='project-form-label'
                />
                <input
                    id='init-project-tech-stack-input'
                    name='tech_stack'
                    type='text'
                    className='project-form-input'
                    placeholder='Enter your project tech stack'
                    aria-required='true'
                    autoComplete='off'
                >
                </input>

                <button
                    type='submit'
                    className='project-form-submit-button'>
                    Upload
                </button>
            </div>
        </form >
    )
}


export default PostForm