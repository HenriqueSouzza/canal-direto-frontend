import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';

/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarPapeis = (params = '') => {

    const endPoint = BASE_API + 'api/papeis' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_PAPEIS, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }
}


/**
 * Método de para salvar um novo papel
 */
export const novoPapel = (params, router) => {

    const endPoint = BASE_API + 'api/papeis';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, params, { headers: headers })
        .then(response => {

            router.goBack()
            dispatch(buscarPapeis())
            toastr.success('Sucesso', 'Papel cadastrado com sucesso')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao cadastrar novo papel')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * Método de para salvar um novo papel
 */
export const alterarPapel = (params, idPapel) => {

    const endPoint = BASE_API + 'api/papeis/' + idPapel;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            dispatch(buscarPapeis('?where[id]=' + idPapel))
            toastr.success('Sucesso', 'Papel alterado com sucesso')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao alterar papel')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}