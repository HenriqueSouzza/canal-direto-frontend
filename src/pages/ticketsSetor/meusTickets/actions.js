import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = (params) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_MEUS_TICKETS_SETOR, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * @param {*} params 
 */
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
 */
export const buscarSetor = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/setor' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_MEU_SETOR, payload: response })
            
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
 */
export const buscarCategoria = (params) => {

    const endPoint = BASE_API + 'api/canal-direto/categoria' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_MINHAS_CATEGORIAS, payload: response })
            
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
export const encaminharTicket = (params, idTicket, router) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            router.goBack()
            toastr.success('Sucesso', 'Ticket encaminhado com sucesso')
            dispatch(buscarMeusTickets('?where[usuario_atendente]=' + params.usuario_interacao))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível finalizar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
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

    if(params.arquivo.length > 0){
        params.arquivo.map( (row) => formData.append('arquivo[]', row))
    }

    if(params.tipoResposta == 'privado'){
        formData.append('privado', 1)
    }else{
        formData.append('publico', 1)
    }
    
    formData.append('usuario_interacao', params.usuario)
    formData.append('papel_usuario', params.papel_usuario)
    formData.append('id_ticket', params.id_ticket)
    formData.append('mensagem', params.mensagem)
    formData.append('status', params.status)
    formData.append('dt_fechamento', params.dt_fechamento)
    formData.append('_method', 'put')
    

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, formData, { headers: headers })
        .then(response => {

            dispatch({type: type.LOAD, payload: true})

            toastr.success('Sucesso', 'Adicionado interação com sucesso')

            if(params.status == 4 ){
                router.go()
            }

            dispatch(buscarInteracoesTicket('?where[id_ticket]=' + idTicket))

        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível inserir sua interação')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}