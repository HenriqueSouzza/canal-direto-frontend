import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API, USER_LOGGED } from '../../config/const';

/*****************************************************************************/
/***************************** MEUS TICKETS **********************************/
/*****************************************************************************/


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/ticket?where[usuario]=' + USER_LOGGED.usuario + params;

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
 * Buscar o setor do usuário que está logado
 */
export const buscarSetor = () => {

    const endPoint = BASE_API + 'api/canal-direto/setor';

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
 * Buscar usuário da categoria que está logado
 */
export const buscarCategoria = (idSetor) => {

    const endPoint = BASE_API + 'api/canal-direto/categoria?where[id_setor]=' + idSetor;

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
 * @param {*} router 
 */
export const buscarInteracoesTicket = (idTicket = '') => {
    
    const endPoint = BASE_API + 'api/canal-direto/interacao-ticket?where[id_ticket]=' + idTicket;

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
 * Método de para salvar um novo ticket
 */
export const salvarNovoTicket = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket';

    const headers = { 
        'Content-Type': `multipart/form-data`
    }

    //classe utilizada para enviar arquivos
    const formData = new FormData();

    if(params.arquivos.length > 0){
        params.arquivos.map( (row) => {
            formData.append('arquivo[]', row)
        })
    }

    formData.append('usuario', USER_LOGGED.usuario)
    formData.append('papel_usuario', USER_LOGGED.papelUsuario.id)
    formData.append('assunto', params.assunto)
    formData.append('setor', params.setor)
    formData.append('categoria', params.categoria)
    formData.append('mensagem', params.mensagem)
    formData.append('status', params.status)

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, formData, { headers: headers })
        .then(response => {

            router.push('/meus-tickets/'+ response.data.response.content.id + '/recibo')
            toastr.success('Sucesso', 'Ticket salvo com sucesso')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível salvar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

export const salvarInteracao = (params, idTicket, router) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = {}

    if(params.tipoResposta == 'privado'){
        params.privado = 1
    }else{
        params.publico = 1
    }

    params.usuario_interacao = USER_LOGGED.usuario
    params.papel_usuario = USER_LOGGED.papelUsuario.id

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Interação adicionada com sucesso')
            dispatch(buscarInteracoesTicket(idTicket))
            dispatch(buscarMeusTickets())
            router.push('/meus-tickets/abertos/' + idTicket + '/visualizar')
            
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
            dispatch(buscarMeusTickets('&whereIn[status]=1,2,3'))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível finalizar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}