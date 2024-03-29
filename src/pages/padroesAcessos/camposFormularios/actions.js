import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarCamposFormularios = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/campos' + params;

    const headers = {}

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

/**
 * 
 * @param {*} params 
 * @param {*} router 
 */
export const novoCampoForm = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/campos';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Status criado com sucesso')
            dispatch(buscarCamposFormularios())
            router.goBack()
            
        })
        .catch(error => {

            console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }
}

/**
 * 
 * @param {*} params 
 * @param {*} router 
 */
export const alterarCampoForm = (params, idFormulario) => {

    const endPoint = BASE_API + 'api/canal-direto/campos/' + idFormulario;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Campo alterado com sucesso')
            dispatch(buscarCamposFormularios())
            
        })
        .catch(error => {

            console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }
}