import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';

/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarPermissoes = (params = '') => {

    const endPoint = BASE_API + 'api/permissoes' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_PERMISSOES, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const atualizarPermissoes = () => {

    const endPoint = BASE_API + 'api/permissoes/update/all';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Permissões atualizadas com sucesso')
            dispatch(buscarPermissoes())
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao tentar atualizar as permissões')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}