import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API } from '../../config/const';


/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const efetuarLogin = (params) => {

    const endPoint = BASE_API + 'api/login';

    return dispatch => {

        dispatch({type: type.LOAD_AUTH, payload: true})
        
        axios.post(endPoint, params)
        .then(response => {
            
            toastr.success('Sucesso', 'Seja bem-vindo !')
            dispatch([{type: type.GUARDAR_TOKEN, payload: response}, validarLogin()])
            
        })
        .catch(error => {

            if(error.response.status == 401){
                toastr.error('Erro', error.response.data.response.content.error)
            }else{
                toastr.error('Erro', 'Ops ! você não tem cadastrado no sistema.')
            }

            dispatch({type: type.LOAD_AUTH, payload: false})

        })
    }
}

/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const efetuarLogout = () => {

    const endPoint = BASE_API + 'api/logout';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD_AUTH, payload: true})
        
        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Volte sempre !')
            dispatch({type: type.REMOVER_TOKEN, payload: {}})

        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Ops ! Erro ao tentar fazer logout.')
            dispatch({type: type.LOAD_AUTH, payload: false})

        })
    }
}

/**
 * Método responsável para efeutar login
 * @param {*} params 
 * @param {*} router 
 */
export const validarLogin = () => {

    const endPoint = BASE_API + 'api/user';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD_AUTH, payload: true})
        
        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Seja bem-vindo !')
            dispatch({type: type.GUARDAR_DATA_LOGIN_USER, payload: response})

        })
        .catch(error => {

            toastr.info('Atenção', 'Faça o login para acessar.')
            dispatch({type: type.REMOVER_TOKEN, payload: {}})

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

        dispatch({type: type.LOAD_AUTH, payload: true})
        
        axios.post(endPoint, params)
        .then(response => {

            toastr.success('Sucesso', 'Alterado com sucesso, verifique seu e-mail com sua nova senha !')

            dispatch({type: type.LOAD_AUTH, payload: false})
            
            router.push('/')
            
        })
        .catch(error => {

            if(error.response.data.error == 401){
                toastr.error('Erro', 'Você não está cadastrado no sistema ou os dados passados estão incorretos')
            }else{
                toastr.error('Erro', 'Ops ! Houve um erro ao tentar alterar sua senha, verique seus dados, caso persista o erro, entre em contato com a equipe UNIDOS.')
            }
            dispatch({type: type.LOAD_AUTH, payload: false})

        })
    }
}