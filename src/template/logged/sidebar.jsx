import React from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import Menu from './menu';

import imgPerfil  from '../images/perfil.png';

import imgLogo  from '../images/logo.png';

function Sidebar(props) {

    const { user } = props.auth

    return (
        <aside className="main-sidebar sidebar-dark-light elevation-4">
            <Link to={`#`} className="brand-link navbar-danger text-sm">
                <img src={imgLogo} className="brand-image img-circle elevation-3" alt={`LogoImage`}/>
                <span className="brand-text font-weight-light">Canal Direto</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={imgPerfil} className="img-circle elevation-2" alt={`UserImage`} />
                    </div>
                    <div className="info">
                        <Link to={`#`} className="d-block">{ user.email ? user.email : 'Sem nome' }</Link>
                    </div>
                </div>
                <Menu />
            </div>
        </aside>
    )

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Sidebar);