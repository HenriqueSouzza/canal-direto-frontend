import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN } from '../../../config/const';

/**
 * método para buscar os dados do usuario
 */
export const buscarDadosInscricao = (params) => {

    const endPoint = '/api/inscricao/dados-inscricao';

    const headers = { Authorization: TOKEN }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, params, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_INSCRICAO, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            toastr.error('Erro', error.response.data.messages.error)

        })
    }

}

/**
 * método para buscar dados do cep
 */
export const buscarCep = (params) => {

    const endPoint = 'https://viacep.com.br/ws/'+ params + '/json'

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint)
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_CEP, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            console.log(error.response)

        })
    }

}

