import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN } from '../../config/const';

/**
 * método para buscar os dados do usuario
 */
export const buscarDadosUsuario = (params) => {

    const endPoint = '/api/pessoa/' + params;

    const headers = { Authorization: TOKEN}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_USUARIO, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            // console.log(error.response)
            if(error.response.data.error == 401){
                toastr.error('Erro', 'Desculpe, você não tem permissão para acessar')
            }else{
                toastr.error('Erro', 'Houve um erro, tente novamente, caso persista entrar em contato com nossa equipe UNIDOS !')
            }

        })
    }

}

/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const alterarSenha = (params, user, router) => {

    const endPoint = '/api/pessoa/' + user;

    const headers = { Authorization: TOKEN }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Cadastrado com sucesso, verifique seu e-mail !')

            dispatch({type: type.LOAD, payload: false})
            
            router.push('/dados-cadastrais/meus-dados')
            
        })
        .catch(error => {

            console.log(error.response.data.error)
            toastr.error('Erro', 'Houve um erro ao tentar alterar sua senha, tente novamente, caso erro persista, favor entrar em contato com a equipe UNIDOS')
            dispatch({type: type.ERROR, payload: false})

        })
    }
}