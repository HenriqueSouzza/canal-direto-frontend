import React, { Component } from 'react';

import '../components/template/dependencies';

import App from'./App';

import Auth from'../pages/auth/auth';

class AuthOrApp extends Component{
    
    render(){

        //
        const url_string = window.location.href;

        //
        const url = new URL(url_string);

        //Pega token da url
        const token_tmp = url.searchParams.get('key');
        
        //Pega user da url 
        const name_user = url.searchParams.get('user');

        //Valida se o token foi passado na url
        const validateToken = token_tmp ? sessionStorage.setItem('token', JSON.stringify({ token: token_tmp })) : token_tmp
        
        //Busca o token na session storage
        const token = sessionStorage.getItem('token')

        //Limpa a url
        if(token_tmp || name_user){
            window.history.pushState("/", document.title, window.location.pathname);
        }
        
        if(validateToken || token){
            
            const validateUser = name_user ? sessionStorage.setItem('user', JSON.stringify({ user: name_user })) : ''
            
            return(<App />)
            
        }else{
            
            // return(<Auth />)
            return window.location.href = 'http://desenv-gonline.iesb.br'

        }


    }

}

export default AuthOrApp;