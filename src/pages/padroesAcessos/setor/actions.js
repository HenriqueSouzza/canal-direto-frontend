import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * método para buscar os setores
 */
export const buscarSetor = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/setor' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_SETOR, payload: response })
            
        })
        .catch(error => {

            console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const cadastrarSetor = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/setor';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')

            dispatch(buscarSetor())

            router.push('/padroes-acessos/setor/' + response.data.response.content.id + '/visualizar')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao tentar cadastrar novo setor')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}



/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const alterarSetor = (params, idSetor) => {

    const endPoint = BASE_API + 'api/canal-direto/setor/' + idSetor;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Cadastro alterado com sucesso !')
            dispatch(buscarSetor('?where[id]=' + idSetor))

        })
        .catch(error => {

            toastr.error('Erro', 'Erro ao tentar alterar dados do setor')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}