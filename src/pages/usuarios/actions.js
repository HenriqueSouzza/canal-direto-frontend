import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API, USER_LOGGED } from '../../config/const';



/**
 * método para buscar os dados do usuario
 */
export const buscarDadosUsuario = () => {

    const endPoint = BASE_API +'api/canal-direto/usuarios';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_DADOS_USUARIO, payload: response })
            
        })
        .catch(error => {

            console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

