import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API } from '../../../config/const';

const URL = `${BASE_API}`;

/**
 * Action Creator para buscar atividades existentes
 */
export const buscarAtividade = (params) => {

    const endPoint = URL + 'atividades-complementares/atividades';

    const parametro = {
        grupo: params.grupo ? params.grupo : ''
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_ATIVIDADES, payload: response })

        })
        .catch(error => {

            // console.log(error)

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })

    }

}


/**
 * Action Creator para buscar atividades para listar no select
 */
export const buscarAtividadeSelect = (params = []) => {

    const endPoint = URL + '/atividades-complementares/atividades/formSelect';

    const parametro = params

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {
            dispatch({ type: type.BUSCAR_ATIVIDADES_SELECT, payload: response })
        })
        .catch(error => {

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })

    }

}


/**
 * Action Creator para salvar uma nova atividade
 */
export const salvarAtividade = (params, router) => {

    const endPoint = URL + 'atividades-complementares/atividades/salvar';

    const parametro = {
        grupo: params.grupo,
        descricao: params.descricao, 
        requisito: params.requisitos,
        classificacao: params.classificacao,
        cargaHoraria: params.cargaHoraria
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            // console.log(response)
            dispatch([router.goBack(), buscarAtividade({grupo: params.tipo_ativ_compl})])
            toastr.success('Sucesso', response.data.message)
            
        })
        .catch(error => {

            // console.log(error.response)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })
    }
}

/**
 * Action Creator para alterar uma atividade
 */
export const alterarAtividade = (params, router) => {

    const endPoint = URL + 'atividades-complementares/atividades/alterar';

    const parametro = {
        atividade: params.atividade,
        grupo: params.tipo_ativ_compl,
        descricao: params.descricao, 
        requisito: params.requisitos,
        classificacao: params.classificacao,
        cargaHoraria: params.cargaHoraria
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
            dispatch([router.goBack(), buscarAtividade({grupo: params.grupo})])
            
        })
        .catch(error => {

            // console.log(error.response)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})
            
        })

    }

}

/**
 * Action creator para remover uma determina atividade
 * @param {*} params 
 */
export const removerAtividade = (params) => {

    const endPoint = URL + 'atividades-complementares/atividades/deletar'
    
    const parametro = {
        atividade: params.atividade ? params.atividade : '',
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
            dispatch(buscarAtividade(params))

        })
        .catch(error => {

            // console.log(error.response)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.LOAD, payload: false})

        })

    }

}