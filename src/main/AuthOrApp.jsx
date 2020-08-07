import React, { Component } from 'react';

import '../components/template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';


class AuthOrApp extends Component{
    
    render(){

        let token = sessionStorage.getItem('token');
        
        if(token){
            
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

export default AuthOrApp;