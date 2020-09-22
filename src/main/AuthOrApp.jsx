import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import '../template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';

import { validarLogin } from '../pages/auth/actions';
import axios from 'axios';


class AuthOrApp extends Component{
    
    componentDidMount(){
        const { dataLogged } = this.props.auth

        if (dataLogged.access_token) {
            this.props.validarLogin(dataLogged.access_token);
        }
    }

    render(){

        const { dataLogged, user } = this.props.auth

        if (dataLogged.access_token && user.email) {

            axios.defaults.headers.common['Authorization'] = `Bearer ${dataLogged.access_token}`;

            return(
                <div>
                    <App />
                </div>
            )
            
        }else{

            return(
                <div>
                    <AuthOrCadastro />
                </div>
            )

        }

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ validarLogin }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp);