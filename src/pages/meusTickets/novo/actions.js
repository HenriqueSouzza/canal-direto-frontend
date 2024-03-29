import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/ticket' + params;

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
 * Método de para salvar um novo ticket
 */
export const salvarNovoTicket = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket';

    const headers = { 
        'Content-Type': `multipart/form-data`,
    }

    //classe utilizada para enviar arquivos
    const formData = new FormData();

    if(params.arquivos.length > 0){
        params.arquivos.map( (row) => formData.append('arquivo[]', row))
    }

    formData.append('usuario', params.usuario)
    formData.append('papel_usuario', params.papel_usuario)
    formData.append('assunto', params.assunto)
    formData.append('setor', params.setor)
    formData.append('categoria', params.categoria)
    formData.append('mensagem', params.mensagem)
    formData.append('status', params.status)

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.post(endPoint, formData, { headers: headers })
        .then(response => {

            router.push('/meus-tickets/novo/'+ response.data.response.content.id + '/recibo')
            toastr.success('Sucesso', 'Ticket salvo com sucesso')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível salvar seu tícket')
            dispatch({type: type.LOAD, payload: false})

        })
    }

}