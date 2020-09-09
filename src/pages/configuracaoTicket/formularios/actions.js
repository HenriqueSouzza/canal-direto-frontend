import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { TOKEN, BASE_API, USER_LOGGED } from '../../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarFormularios = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/formularios' + params;

    const headers = { Authorization: ''}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_FORMULARIOS, payload: response })
            
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
export const novoFormulario = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/formularios';

    const headers = { Authorization: ''}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Formulário criado com sucesso')
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
export const alterarFormulario = (params, idFormulario) => {

    const endPoint = BASE_API + 'api/canal-direto/formularios/' + idFormulario;

    const headers = { Authorization: ''}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Formulário alterado com sucesso')
            dispatch(buscarFormularios())
            
        })
        .catch(error => {

            console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }
}