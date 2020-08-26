import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN, BASE_API, USER_LOGGED } from '../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = () => {

    const endPoint = BASE_API + 'api/canal-direto/ticket?where[usuario]=' + USER_LOGGED.usuario + '&status=abertos&order=created_at,desc';

    const headers = { Authorization: ''}

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
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarTicketsSetor = () => {

    const setorUser = 1

    const endPoint = BASE_API + 'api/canal-direto/ticket?where[id_setor]=' + setorUser;

    const headers = { Authorization: ''}

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
 * Buscar o setor do usuário que está logado
 */
export const buscarSetor = () => {

    const endPoint = BASE_API + 'api/canal-direto/setor';

    const headers = { Authorization: ''}

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

    const headers = { Authorization: ''}

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

    const headers = { Authorization: ''}

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

export const salvarInteracao = (params) => {

    const endPoint = BASE_API + 'api/canal-direto/interacao-ticket';

    const headers = { 
        Authorization: '',
        'Content-Type': `multipart/form-data`
    }

    //classe utilizada para enviar arquivos
    const formData = new FormData();

    if(params.arquivo.length > 0){
        params.arquivo.map( (row) => {
            formData.append('arquivo[]', row)
        })
    }
    
    formData.append('usuario_interacao', USER_LOGGED.usuario)
    formData.append('acao', params.acao)
    formData.append('papel_usuario', USER_LOGGED.papelUsuario.id)
    formData.append('id_ticket', params.id_ticket)
    formData.append('mensagem', params.mensagem)

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, formData, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Adicionado interação com sucesso')
            dispatch(buscarInteracoesTicket(params.id_ticket))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível inserir sua interação')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

export const fecharTicket = (params, idTicket, router) => {

    params.usuario_fechamento = USER_LOGGED.usuario

    const endPoint = BASE_API + 'api/canal-direto/ticket/' + idTicket;

    const headers = { Authorization: ''}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            router.goBack()
            toastr.success('Sucesso', 'Ticket fechado com sucesso')
            dispatch(buscarMeusTickets(USER_LOGGED))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível finalizar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}