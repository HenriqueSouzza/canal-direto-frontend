import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API } from '../../../config/const';

const URL = `${BASE_API}`;

/**
 * Action creator para buscar um grupo de atividade
 * @param {*} params 
 */
export const buscarGrupoAtividade = (params = []) => {

    const endPoint = URL + 'atividades-complementares/gruposAtividades';

    const parametro = {
        codigo: params.length > 0 ? params : ''
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_GRUPO_ATIVIDADE, payload: response })

        })
        .catch(error => {

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.LOAD, payload: false})

        })

    }
    
}

/**
 * Action creator para salvar um grupo de atividade
 * @param {*} params 
 */
export const salvarGrupoAtividade = (params, router) => {

    const endPoint = URL + 'atividades-complementares/gruposAtividades/salvar'
    
    const parametro = {
        descricao: params.descricao ? params.descricao : '', 
        grupo: params.grupo ? params.grupo : '',
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            router.goBack()
            toastr.success('Sucesso', response.data.message)
            dispatch(buscarGrupoAtividade(parametro))

        })
        .catch(error => {

            // console.log(error)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.LOAD, payload: false})

        })

    }

}

/**
 * Action creator para alterar um grupo de atividade
 * @param {*} params 
 */
export const alterarGrupoAtividade = (params) => {

    
    const endPoint = URL + 'atividades-complementares/gruposAtividades/alterar';

    const parametro = {
        descricao: params.descricao ? params.descricao : '',
        grupo: params.grupo ? params.grupo : '',
        codigo: params.codigo ? params.codigo : ''
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            // console.log(response)
            toastr.success('Sucesso', response.data.message)
            dispatch(buscarGrupoAtividade(parametro))

        })
        .catch(error => {
            
            // console.log(error.response)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.LOAD, payload: false})

        })

    }

}


/**
 * Action creator para remover um grupo de atividades
 * @param {*} params 
 */
export const removerGrupoAtividade = (params) => {

    const endPoint = URL + 'atividades-complementares/gruposAtividades/deletar'
    
    const parametro = {
        codigo: params ? params : ''
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            // console.log(response.data)
            toastr.success('Sucesso', response.data.message)
            dispatch(buscarGrupoAtividade(parametro))

        })
        .catch(error => {

            // console.log(error)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.LOAD, payload: false})

        })

    }

}