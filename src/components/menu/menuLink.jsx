import React from 'react';

import { Link } from 'react-router-dom';

function menuLink(props){

    const { description, path, icon, active  } = props  

    return(
        <li className="nav-item has-treeview">
            <Link to={path} className={`nav-link ` + active}>
                <i className={`nav-icon ` + icon}></i> <p className="text-white">{description}</p>
            </Link>
        </li>
    )
}

export default menuLink;