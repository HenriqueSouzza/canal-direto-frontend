import React, { Component } from 'react';

import { connect } from 'react-redux';

import '../components/template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';

import Spinner from '../components/loading/spinner';

class AuthOrApp extends Component{
    
    render(){

        let auth = this.props.auth.loading;
        // let auth = false
        // let dadosCadastrais = this.props.dadosCadastrais.loading;

        let token = sessionStorage.getItem('token');

        if(auth){
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
const mapStateToProps = state => ({ auth: state.auth, dadosCadastrais: state.dadosCadastrais})

export default connect(mapStateToProps, null)(AuthOrApp);