import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API } from '../../config/const';

const URL = `${BASE_API}`;


/**
 * método provisório de login do gestor online
 */
export const verificarLogin = (params) => {

    const endPoint = BASE_API + '/usuarios/verificarPermissao';

    const parametro = {token: params}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro)
        .then(response => {

            console.log(response)
            dispatch({ type: type.GUARDAR_TOKEN, payload: parametro })
            // console.log(response)
            // router.goBack()
            // toastr.success('Sucesso', response.data.message)
            
        })
        .catch(error => {

            // console.log(error.response)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

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

            router.go()
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Usuário sem acesso ao sistema')
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
            
            router.push('/')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Houve um erro, tente novamente, se persistir o erro, entre em contato com o e-mail email@email.com')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}