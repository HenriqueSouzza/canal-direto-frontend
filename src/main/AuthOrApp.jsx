import React, { Component } from 'react';

import '../components/template/dependencies';

import App from'./App';

import Auth from'../pages/auth/auth';

import Cadastro from'../pages/cadastro/cadastro';

class AuthOrApp extends Component{
    
    render(){

        //Pega token da url
        const token_tmp = ''
        
        //Pega user da url 
        const name_user = '';

        //Valida se o token foi passado na url
        const validateToken = token_tmp ? sessionStorage.setItem('token', JSON.stringify({ token: token_tmp })) : token_tmp
        
        //Busca o token na session storage
        const token = sessionStorage.getItem('token')

        if(!validateToken || token){
            
            const validateUser = name_user ? sessionStorage.setItem('user', JSON.stringify({ user: name_user })) : ''
            
            // return(<App />)
            return(<Cadastro />)
            
        }else{
            
            return(<Auth />)

        }


    }

}

export default AuthOrApp;