import React from 'react';

function Upload(props){

    const onChange = e => {
        props.onChange(e.target.files)
    } 


    return(
        <>
            <label htmlFor="file-upload" className={`btn btn-default`}>
                <i className="fa fa-paperclip"></i>
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

export default Upload;