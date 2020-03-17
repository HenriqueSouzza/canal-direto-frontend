import React from 'react';

function Upload(props){

    const { label, type, placeholder, icon, disabled, input } = props

    const {touched ,error} = props.meta

    const fileInput = React.createRef()

    const handleChange = () => {
        input.onChange(fileInput.current.files[0])
    }

    return(
        <div className={`form-group`}>
            <label>{label}</label>
            <div className="input-group">
                <input type={type} {...props.input} ref={fileInput} value={fileInput.current ? fileInput.current.files : '' } onChange={handleChange} disabled={disabled} className={`form-control ${touched && error && "is-invalid"}`} placeholder={placeholder} />
                <div className="input-group-append">
                    <div className="input-group-text">
                        <i className={icon}></i>
                    </div>
                </div>
                <div className={`${touched && error && "invalid-feedback"}`}>
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </div>
        </div>
    )
}

export default Upload;