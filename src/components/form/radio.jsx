import React from 'react';

function radio(props){

    return(
        <div className="form-check">
            <input {...props.input}/>
            <label className="form-check-label">{props.label}</label>
        </div>
    )   
}

export default radio;