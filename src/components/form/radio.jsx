import React from 'react';

function radio(props){

    const {touched ,error} = props.meta

    return(
        <div className={`custom-control custom-radio`}>
            <input className={`custom-control-input ${touched && error && "is-invalid"}`} id={props.input.value} {...props.input}></input>
            <label className="custom-control-label" htmlFor={props.input.value}>{props.label}</label>
            <div className={`${touched && error && "invalid-feedback"}`}>
                {touched && error && <span className="help-block">{error}</span>}
            </div>
        </div>
    )   
}

export default radio;