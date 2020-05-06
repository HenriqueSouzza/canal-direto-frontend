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
            
            return(
                <div>
                    {/* <LoadingBody status={ dadosCadastrais }/> */}
                    <App />
                </div>
            )
            
        }else{

            return(
                <div>
                    {/* <LoadingBody status={ auth }/> */}
                    <AuthOrCadastro />
                </div>
            )

        }

    }

}

export default AuthOrApp;