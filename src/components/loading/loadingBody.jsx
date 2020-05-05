import React from 'react';

import Spinner from './spinner';

import './style.css';

function LoadingBody(props){

    return (
        <div className="text-center d-flex justify-content-center loadingBody">
            <div className="align-self-center">
                <Spinner />
            </div>
        </div>
    )
    
}

export default LoadingBody;