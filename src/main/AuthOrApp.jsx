import React, { Component } from 'react';

import { connect } from 'react-redux';

import '../components/template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';

import LoadingBody from '../components/loading/loadingBody';

class AuthOrApp extends Component{
    
    render(){

        console.log(this.props)

        let token = sessionStorage.getItem('token');
        
        
        if(token){
            
            let dadosCadastrais = this.props.dadosCadastrais.loading;
           
            return(
                <div>
                    <LoadingBody status={ dadosCadastrais }/>
                    <App />
                </div>
            )
            
        }else{

            let auth = this.props.auth.loading;
            
            return(
                <div>
                    <LoadingBody status={ auth }/>
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