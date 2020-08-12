import React from 'react';

function textArea(props){

    const { label, placeholder, disabled } = props

    const {touched ,error} = props.meta

    return(
        <div className={`form-group`}>
            <label>{label}</label>
            <div className="input-group">
                <textarea {...props.input} {...props} value={props.input.value} disabled={disabled} className={`form-control ${touched && error && "is-invalid"}`} placeholder={placeholder} />
                <div className={`${touched && error && "invalid-feedback"}`}>
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </div>
        </div>
    )
}

export default textArea;