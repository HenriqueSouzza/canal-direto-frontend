import React, { Component } from 'react';

import { connect } from 'react-redux';

import '../components/template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';

import LoadingBody from '../components/loading/loadingBody';

class AuthOrApp extends Component{
    
    render(){

        let token = sessionStorage.getItem('token');

        if(token){
            
            return(<App />)
            
        }else{
            
            return(
                <div>
                    <LoadingBody />
                    <AuthOrCadastro />
                </div>
            )

        }

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth, dadosCadastrais: state.dadosCadastrais})

export default connect(mapStateToProps, null)(AuthOrApp);