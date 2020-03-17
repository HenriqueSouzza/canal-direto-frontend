import React from 'react';

import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={`#`} className="nav-link" data-widget="pushmenu">
                        <i className="fas fa-bars"></i>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header;