import React from 'react';

function Input(props){

    const { label, type, placeholder, icon, disabled } = props

    const {touched ,error} = props.meta

    return(
        <div className={`form-group`}>
            <label>{label}</label>
            <div className="input-group">
                <input type={type} {...props.input} {...props} value={props.input.value} disabled={disabled} className={`form-control ${touched && error && "is-invalid"}`} placeholder={placeholder} />
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

export default Input;