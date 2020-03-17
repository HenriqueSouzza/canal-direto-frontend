import React from 'react';

import { Link } from 'react-router-dom';

function button(props){

    const { description, router, color, icon } = props

    return(
        <Link to={router} className="btn">
            <button className={`btn ${color}`}>
                <i className={`fa ${icon}`}></i> {description}
            </button>
        </Link>
    )
}

export default button;