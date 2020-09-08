import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { TOKEN, BASE_API, USER_LOGGED } from '../../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarCamposFormularios = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/campos' + params;

    const headers = { Authorization: ''}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_CAMPOS_FORMULARIOS, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}