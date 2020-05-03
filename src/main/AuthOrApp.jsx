import React, { Component } from 'react';

import { connect } from 'react-redux';

import '../components/template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';

import Spinner from '../components/loading/spinner';

class AuthOrApp extends Component{
    
    render(){

        let { loading } = this.props.auth;

        let token = sessionStorage.getItem('token');

        if(loading){
            return (
                <div className="text-center d-flex justify-content-center" style={{height: '100vh', background: 'rgba(0,0,0,0.1)'}}>
                    <div className="align-self-center">
                        <Spinner />
                    </div>
                </div>
            )
        }

        if(token){
            
            return(<App />)
            
        }else{
            
            return(<AuthOrCadastro />)

        }

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, null)(AuthOrApp);