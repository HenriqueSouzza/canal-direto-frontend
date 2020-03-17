import React from 'react';

import { Link } from 'react-router-dom';

function menuTreeView(props){

    const { description, path, icon, active, children  } = props  

    return(
        <li className="nav-item has-treeview">
            <Link to={path} className={`nav-link`}>
                <i className={`nav-icon ` + icon}></i>
                <p className="text-white">{description} <i className="right fas fa-angle-left"></i></p>
            </Link>
            <ul className="nav nav-treeview">
                {children}
            </ul>
        </li>
    )
}

export default menuTreeView;