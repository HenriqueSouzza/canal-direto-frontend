import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const efetuarLogin = (params, router) => {

    const endPoint = '/api/usuario/login';

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params)
        .then(response => {
            
            toastr.success('Sucesso', 'Seja bem-vindo !')
            
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('user', response.data.pessoa)
            
            dispatch({type: type.GUARDAR_TOKEN, payload: response})

            router.go()
            
        })
        .catch(error => {

            if(error.response.data.error == 401){
                toastr.error('Erro', 'Usuário ou senha incorreto')
            }else{
                toastr.error('Erro', 'Ops ! você não tem cadastrado no sistema.')
            }
            dispatch({type: type.LOAD, payload: false})

        })
    }
}


/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const criarPessoa = (params, router) => {

    const endPoint = '/api/pessoa';

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, params)
        .then(response => {

            toastr.success('Sucesso', 'Cadastrado com sucesso, verifique seu e-mail !')

            dispatch({type: type.LOAD, payload: false})
            
            router.push('/')
            
        })
        .catch(error => {

            console.log(error.response.data.error)
            toastr.error('Erro', 'Houve um erro, tente novamente, se persistir o erro, entre em contato com o e-mail email@email.com')
            dispatch({type: type.ERROR, payload: false})

        })
    }
}

/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const resetSenha = (params, router) => {

    const endPoint = '/api/pessoa/resetar-senha';

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.put(endPoint, params)
        .then(response => {

            toastr.success('Sucesso', 'Alterado com sucesso, verifique seu e-mail com sua nova senha !')

            dispatch({type: type.LOAD, payload: false})
            
            router.push('/')
            
        })
        .catch(error => {

            if(error.response.data.error == 401){
                toastr.error('Erro', 'Você não está cadastrado no sistema ou os dados passados estão incorretos')
            }else{
                toastr.error('Erro', 'Ops ! houve um erro técnico tente novamente, caso persista o erro entre em contato com a equipe UNIDOS.')
            }
            dispatch({type: type.LOAD, payload: false})

        })
    }
}