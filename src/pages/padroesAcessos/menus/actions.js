import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * método para buscar os setores
 */
export const buscarMenus = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/menus' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_MENUS, payload: response })
            
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
export const novoMenu = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/menus';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')
            router.push('/padroes-acessos/menus/' + response.data.response.content.id + '/visualizar')
            
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
export const alterarMenu = (params, idMenu) => {

    const endPoint = BASE_API + 'api/canal-direto/menus/' + idMenu;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Alterado com sucesso !')
            dispatch(buscarMenus('?where[id]=' + idMenu))

        })
        .catch(error => {

            toastr.error('Erro', 'Erro ao tentar alterar os dados do menu')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}