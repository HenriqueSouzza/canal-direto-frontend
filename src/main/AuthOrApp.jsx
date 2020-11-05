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
        this.props.validarLogin();
    }

    render(){

        const { dataLogged, user } = this.props.auth

        if(dataLogged.access_token){
            axios.defaults.headers.common['Accept'] = 'application/json'
            axios.defaults.headers.common['Authorization'] = `Bearer ${dataLogged.access_token}`
        }

        if (dataLogged.access_token && user.email) {

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