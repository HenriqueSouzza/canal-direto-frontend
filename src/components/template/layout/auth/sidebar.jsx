import React from 'react';

import imgLogo  from '../../images/logo.png';

import './style.css';
 
function Sidebar() {

    return (
        <div className="col-md-5 align-self-center">
            <div className="login-logo">
                <img src={imgLogo} className="brand-image img-logo img-circle elevation-3" alt={`LogoImage`} />
            </div>
            <div className="text-center">
                <h1>
                    <p className="text-white">
                        Bem-vindo !
                    </p>
                </h1>
                <h5>
                    <p className="text-white">
                        Nossa plataforma UNIDOS está cheio de novidades.<br></br>
                        Para realizar sua inscrição nos eventos do UNIDOS é só logar em nosso sistema.<br></br>
                    </p>
                </h5>
            </div>
        </div>
    )
}

export default Sidebar;