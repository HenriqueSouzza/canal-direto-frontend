import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { TOKEN, BASE_API, USER_LOGGED } from '../../../config/const';

import { buscarInteracoesTicket } from '../actions';


/**
 * 
 * @param {*} params 
 * @param {*} idTicket 
 * @param {*} router 
 */
export const encaminharTicket = (params, idTicket, router) => {

    params.usuario_interacao = USER_LOGGED.usuario
    params.papel_usuario = USER_LOGGED.papelUsuario.id

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = { Authorization: 'Bearer ' + TOKEN}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            router.goBack()
            toastr.success('Sucesso', 'Ticket encaminhado com sucesso')
            dispatch(buscarTicketsSetor())
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível finalizar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarTicketsSetor = (params = '') => {

    const setorUser = '1,2'

    const endPoint = BASE_API + 'api/canal-direto/ticket?whereIn[setor]=' + setorUser + params;

    const headers = { Authorization: 'Bearer ' + TOKEN}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_TICKETS_SETOR, payload: response })
            
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
 * @param {*} router 
 */
export const fecharTicket = (params, idTicket, router) => {

    params.usuario_fechamento = USER_LOGGED.usuario
    params.papel_usuario = USER_LOGGED.papelUsuario.id

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = { Authorization: 'Bearer ' + TOKEN}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            router.goBack()
            toastr.success('Sucesso', 'Ticket fechado com sucesso')
            dispatch(buscarTicketsSetor("&where[aberto]=1"))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível finalizar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * 
 * @param {*} params 
 * @param {*} idTicket 
 * @param {*} router 
 */
export const responderTicket = (params, idTicket, router) => {

    params.usuario_atendente = USER_LOGGED.usuario
    params.papel_usuario = USER_LOGGED.papelUsuario.id

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = { Authorization: 'Bearer ' + TOKEN}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {
            
            dispatch([buscarTicketsSetor('&where[id]=' + idTicket), buscarInteracoesTicket(idTicket)])
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível habilitar para responder esse ticket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}