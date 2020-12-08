import React, { Component } from 'react';
import initContentContext from '../../contexts/initContentContext';
import AvatarDefault from '../../Images/avatar-default.png';
import UploadLogo from '../../Images/upload-logo.png';
import '../../css/PhotoUpload.css';

class ProjectUpload extends Component {

    /*This component has the form where users can upload a new project*/

    static contextType = initContentContext;

    state = {
        error: null,
        file: null,
        data: null,
    };

    inputRef = React.createRef();

    checkExtension = (fileName) => {
        const pattern = '(' + ['.jpg', '.gif', '.png', '.jpeg'].join('|').replace(/\./g, '\\.') + ')$';
        return new RegExp(pattern, 'i').test(fileName);
    }

    changeFile = (ev) => {
        const { setProjectData } = this.context;

        if (!ev.target.files.length) {
            return;
        };

        if (this.checkExtension(ev.target.files[0].name)) {
            setProjectData();
            this.readFile(ev.target.files[0]).then(file => {
                if (file.file.size <= 1048576) {
                    this.setState(oldVals => ({
                        ...oldVals,
                        data: file.dataURL,
                        file: file.file,
                        error: null
                    }));
                } else {
                    this.setState({ error: 'File Size Larger Than 1MB' });
                }
                setProjectData();
            }).catch(err => {
                this.setState({ error: err });
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
        const { error } = this.state
        return (
            <div className='avatar-uploader'>


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
                    {error && <p>{error}</p>}
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
                    .jpg .gif .png .jpeg &nbsp;<br />image required up to 1MB
                        </span>

            </div>
        );
    };
};

export default ProjectUpload;