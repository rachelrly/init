import React, { Component } from 'react'
import initContentContext from '../../contexts/initContentContext'
import AvatarDefault from '../Footer/Images/avatar-default.png'
import UploadLogo from '../Footer/Images/upload-logo.png'
import ProfilePic from '../ProfilePic/ProfilePic'
import '../../css/PhotoUpload.css'

class PhotoUpload extends Component {
    static contextType = initContentContext

    state = {
        error: null,
        file: null,
        data: null,
    }

    inputRef = React.createRef()

    checkExtension = (fileName) => {
        const pattern = '(' + ['.jpg', '.gif', '.png', '.jpeg'].join('|').replace(/\./g, '\\.') + ')$';
        return new RegExp(pattern, 'i').test(fileName);
    }

    changeFile = (ev) => {
        const { setData } = this.context

        if (!ev.target.files.length) {
            return
        }

        if (this.checkExtension(ev.target.files[0].name)) {
            this.readFile(ev.target.files[0]).then(file => {
                if (file.file.size <= 1048576) {
                    this.setState(oldVals => ({
                        ...oldVals,
                        data: file.dataURL,
                        file: file.file,
                        error: null
                    }))
                    console.log('file', file)
                } else {
                    this.setState({ error: 'File Size Larger Than 1MB' })
                }
                setData()
            }).catch(err => {
                this.setState({ error: err })
            })
        } else {
            this.setState({ error: 'File Type Not Supported' })
        }
    }

    renderPreview() {
        return (
            <div className='upload-preview'>
                <img
                    src={this.state.data}
                    alt='upload-preview'
                    className='circular-landscape'
                />
            </div>
        )
    }

    readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // read the image received via FileReader and later save it to state
            reader.onload = function (ev) {
                // add the file name to the data URL
                let dataURL = ev.target.result;
                dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
                resolve({ file, dataURL });
            };
            reader.readAsDataURL(file);
        });
    }

    render() {
        return (
            <div className='avatar-uploader'>
                <fieldset>
                    <legend><h3>userAvatar</h3></legend>
                    {this.state.data
                        ? this.renderPreview()
                        : (<img
                            src={AvatarDefault}
                            className='upload-default-avatar'
                            alt='avatar-default-logo'
                        />)
                    }
                    <div
                        role='alert'
                        className='error-message'
                        aria-live='assertive'
                    >
                        {this.state.error && <p>{this.state.error.message}</p>}
                    </div>
                    <label htmlFor='upload-selector'>
                        <img
                            src={UploadLogo}
                            alt='upload-button'
                            className='upload-selector-button'
                        />
                    </label>
                    <input
                        ref={this.inputRef}
                        accept='image/*'
                        type='file'
                        id='upload-selector'
                        onChange={this.changeFile}
                        name='imageRequest'
                        required
                        aria-required='true'
                        autoComplete='off'
                        className='original-input'
                    />
                    <span className='image-info'>
                        .jpg .gif .png .jpeg up to 1MB<br /><br />image required to upload
                    </span>
                </fieldset>
            </div>
        )
    }
}

export default PhotoUpload