import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API, TOKEN } from '../../config/const';

/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const efetuarLogin = (params, router) => {

    const endPoint = BASE_API + 'api/login';

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params)
        .then(response => {
            
            toastr.success('Sucesso', 'Seja bem-vindo !')

            dispatch({type: type.GUARDAR_TOKEN, payload: response})

            router.go()
            
        })
        .catch(error => {

            if(error.response.status == 401){
                toastr.error('Erro', error.response.data.response.content.error)
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
export const efetuarLogout = (router) => {

    const endPoint = BASE_API + 'api/logout';

    const headers = { Authorization: 'Bearer ' + TOKEN}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Volte sempre !')
            
            dispatch({type: type.REMOVER_TOKEN, payload: response})

            router.push('/')
            
            router.go()
            
        })
        .catch(error => {

            toastr.error('Erro', 'Ops ! Erro ao tentar fazer logout.')
            dispatch({type: type.LOAD, payload: false})

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
        
        axios.post(endPoint, params)
        .then(response => {

            toastr.success('Sucesso', 'Alterado com sucesso, verifique seu e-mail com sua nova senha !')

            dispatch({type: type.LOAD, payload: false})
            
            router.push('/')
            
        })
        .catch(error => {

            if(error.response.data.error == 401){
                toastr.error('Erro', 'Você não está cadastrado no sistema ou os dados passados estão incorretos')
            }else{
                toastr.error('Erro', 'Ops ! Houve um erro ao tentar alterar sua senha, verique seus dados, caso persista o erro, entre em contato com a equipe UNIDOS.')
            }
            dispatch({type: type.LOAD, payload: false})

        })
    }
}