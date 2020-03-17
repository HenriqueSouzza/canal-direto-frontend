import React from 'react';

function Spinner(props){

    const { color } = props

    return(
        <div className={`spinner-border ${color}`} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner;