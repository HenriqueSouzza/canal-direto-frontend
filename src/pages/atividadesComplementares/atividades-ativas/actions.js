import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API } from '../../../config/const';

const URL = `${BASE_API}`;

/**
 * Actions Creator para salvar uma categoria
 */
export const buscarAtividadesAtivas = (params = []) => {

    // const endPoint = URL;
    const endPoint = URL + 'atividades-complementares/atividadesAtivas';

    const parametro = {
        subatividade: params.subatividade ? params.subatividade : '',
        dataInicio: params.dataInicio ? params.dataInicio : '',
        dataFim: params.dataFim ? params.dataFim : '',
        ativo: params.ativo ? params.ativo : ''
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {
        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {
            dispatch({ type: type.BUSCAR_ATIVIDADES_ATIVAS, payload: response })
        })
        .catch(error => {

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})
            
        })

    }

}

export const buscarAtividadesSelect = () => {
    
    const endPoint = URL + 'atividades-complementares/atividadesAtivas';

    const parametro = {
        subatividade: '',
        dataInicio: '',
        dataFim: '',
        ativo: ''
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {
        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            // console.log(response)
            dispatch({ type: type.BUSCAR_ATIVIDADES_ATIVAS_SELECT, payload: response })

        })
        .catch(error => {

            // console.log(error.response)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })

    }
}