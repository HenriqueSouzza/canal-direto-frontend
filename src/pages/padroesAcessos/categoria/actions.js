import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * método para buscar os setores
 */
export const buscarCategoria = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/categoria' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_CATEGORIA, payload: response })
            
        })
        .catch(error => {

            console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * Método responsável para cadastrar nova categoria
 * @param {*} params 
 * @param {*} router 
 */
export const cadastrarCategoria = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/categoria';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')
            router.push('/padroes-acessos/setor/' + params.setor + '/visualizar')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao tentar adicionar nova categoria ao setor')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}



/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const alterarCategoria = (params, idCategoria) => {

    const endPoint = BASE_API + 'api/canal-direto/categoria/' + idCategoria;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Categoria cadastrada com sucesso !')
            dispatch(buscarCategoria('?where[id]=' + idCategoria))

        })
        .catch(error => {

            toastr.error('Erro', 'Erro ao tentar alterar dados do setor')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}