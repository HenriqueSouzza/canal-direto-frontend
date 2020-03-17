import React from 'react';

function Button(props){

    const { type, icon, description, color, disabled } = props
    
    return(
        <div className="input-group mb-3">
            <button type={type} {...props.input} disabled={disabled} className={`btn ${color} btn-block`}>
                <i className={icon}></i> {description}
            </button>
        </div>
    )
}

export default Button;