import React, { Component } from 'react';

import '../components/template/dependencies';

import App from'./App';

import AuthOrCadastro from '../main/AuthOrCadastro';

class AuthOrApp extends Component{
    
    render(){

        let token = ''

        if(token){
            
            return(<App />)
            
        }else{
            
            return(<AuthOrCadastro />)

        }

    }

}

export default AuthOrApp;