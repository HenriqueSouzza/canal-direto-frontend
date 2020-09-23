import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';

/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarPapeis = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/papeis' + params;

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