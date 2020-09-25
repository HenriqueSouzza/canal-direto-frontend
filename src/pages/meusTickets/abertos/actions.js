import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API, USER_LOGGED } from '../../../config/const';

/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/ticket?whereIn[status]=1,2,3' + params;

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
export const salvarInteracao = (params, idTicket) => {

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

    if(params.arquivo.length > 0){
        params.arquivo.map( (row) => {
            formData.append('arquivo[]', row)
        })
    }

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
            dispatch(buscarInteracoesTicket('?where[id_ticket]=' + idTicket))
            dispatch(buscarMeusTickets('&where[id]=' + idTicket))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível inserir sua interação')
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

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            router.push('/meus-tickets/fechados')
            toastr.success('Sucesso', 'Ticket fechado com sucesso')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível finalizar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}