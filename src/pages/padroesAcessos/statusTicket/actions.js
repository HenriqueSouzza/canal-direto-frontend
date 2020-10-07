import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


export const buscarStatusTicket = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/status-ticket' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_STATUS_TICKET, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

export const novoStatusTicket = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/status-ticket';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Status criado com sucesso')
            router.goBack()
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível criar esse status')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}

export const alterarStatusTicket = (params, id) => {

    const endPoint = BASE_API + 'api/canal-direto/status-ticket/' + id;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Status alterado com sucesso')
            dispatch(buscarStatusTicket('?where[id]=' + id))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível alterar esse status')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}