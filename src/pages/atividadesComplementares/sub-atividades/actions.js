import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API } from '../../../config/const';

const URL = `${BASE_API}`;


/**
 * 
 */
export const buscarDadosSubAtividadeForm = (params = []) => {

    const endPoint = URL + 'atividades-complementares/sub-atividade/formSelect';

    const parametro = params

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD_SELECT, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            dispatch({ type: type.FORM_SUB_ATIVIDADE, payload: response })

        })
        .catch(error => {

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })

    }
}

export const buscarDadosEditarSubAtividade = () => {

    const endPoint = URL + 'atividades-complementares/sub-atividade/formData';

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {
        
        dispatch({type: type.LOAD_SELECT, payload: true})

        axios.post(endPoint, {}, { headers: headers })
            .then(response => {

                dispatch({ type: type.FORM_EDIT_SUB_ATIVIDADE, payload: response })

            })
            .catch(error => {

                toastr.error('Erro', error.response.data.message)
                dispatch({type: type.ERROR, payload: false})

        })

    }

}

export const buscarSubAtividade = (params) => {

    const endPoint = URL + 'atividades-complementares/sub-atividade'

    const parametro = {
        tipo: params.grupo,
        atividade: params.atividade
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_SUB_ATIVIDADE, payload: response })

        })
        .catch(error => {
            
            // console.log(error)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })

    }

}

/**
 * Action Creator para guardar um aluno vinculado a uma atividade
 */
export const salvarSubAtividade = (params, router) => {

    const endPoint = URL + 'atividades-complementares/sub-atividade/salvar';

    const parametro = params

    const dados = {
        atividade: params.get('atividade'), 
        grupo: params.get('tipo_ativ_compl')
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers: headers })
        .then(response => {

            // console.log(response)
            router.goBack()
            toastr.success('Sucesso', response.data.message)
            dispatch(buscarSubAtividade(dados))

        })
        .catch(error => {

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR})

        })

    }

}


/**
 * Action Creator para guardar um aluno vinculado a uma atividade
 */
export const alterarSubAtividade = (params) => {

    const endPoint = URL + 'atividades-complementares/sub-atividade/alterar';

    const parametro = params

    const dados = {
        atividade: params.get('atividade'),
        grupo: params.get('tipo_ativ_compl')
    }

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers, headers })
        .then(response => {

            // console.log(response)
            toastr.success('Sucesso', response.data.message)
            dispatch(buscarSubAtividade(dados))

        })
        .catch(error => {

            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })

    }

}

/**
 * @param {*} params 
 */
export const removerSubatividade = (params) => {

    const endPoint = URL + 'atividades-complementares/sub-atividade/deletar'
    
    const parametro = params

    const data_token = sessionStorage.getItem('token')

    const token_temp = JSON.parse(data_token)

    const headers = {'Authorization': token_temp.token }
    
    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, parametro, { headers, headers })
        .then(response => {

            // console.log(response)
            toastr.success('Sucesso', response.data.message)
            dispatch(buscarSubAtividade(parametro))
            
        })
        .catch(error => {

            // console.log(error)
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})
        })

    }

}