import React from 'react';

function UploadAnexo(props){

    const onChange = e => {
        props.onChange(e.target.files)
    } 


    return(
        <>
            <label htmlFor="file-upload" className={`btn ${props.className ? props.className : 'btn-default'}`}>
                <i className="fa fa-paperclip"></i> {props.label}
            </label>
            <input 
                {...props}
                className={`form-control`}
                onChange={onChange}
                id="file-upload" 
                style={{display: 'none'}} 
            />
        </>
    )
}

export default UploadAnexo;