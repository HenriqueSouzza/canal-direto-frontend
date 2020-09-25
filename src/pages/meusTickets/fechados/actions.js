import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API, USER_LOGGED } from '../../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/ticket?whereIn[status]=4,5' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_MEUS_TICKETS, payload: response })
            
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
export const buscarInteracoesTicket = (params = '') => {
    
    const endPoint = BASE_API + 'api/canal-direto/interacao-ticket' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_INTERACOES_TICKETS, payload: response })
            
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
 * @param {*} idTicket 
 */
export const salvarInteracao = (params, idTicket, router) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = { 
        'Content-Type': `multipart/form-data`
    }

    //classe utilizada para enviar arquivos
    const formData = new FormData();

    if(params.tipoResposta == 'privado'){
        formData.append('privado', 1)
    }else{
        formData.append('publico', 1)
    }

    formData.append('status', params.status)
    formData.append('dt_fechamento', params.dt_fechamento)
    formData.append('usuario_interacao', USER_LOGGED.usuario)
    formData.append('id_ticket', idTicket)
    formData.append('papel_usuario', USER_LOGGED.papelUsuario.id)
    formData.append('mensagem', params.mensagem)
    formData.append('_method', 'put')

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, formData, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Interação adicionada com sucesso')
            router.push('/meus-tickets/abertos')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível inserir sua interação')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}