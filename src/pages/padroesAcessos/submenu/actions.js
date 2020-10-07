import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


/**
 * método para buscar os setores
 */
export const buscarSubMenu = (params = '') => {

    const endPoint = BASE_API + 'api/canal-direto/submenus' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_SUB_MENU, payload: response })
            
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
export const novoSubMenu = (params, router, idMenu) => {

    const endPoint = BASE_API + 'api/canal-direto/submenus';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')
            router.push('/padroes-acessos/menus/' + idMenu + '/visualizar')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao tentar cadastrar novo submenu')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}



/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const alteraSubMenu = (params, idSubMenu) => {

    const endPoint = BASE_API + 'api/canal-direto/submenus/' + idSubMenu;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Cadastro alterado com sucesso !')
            dispatch(buscarSubMenu('?where[id]=' + idSubMenu))

        })
        .catch(error => {

            toastr.error('Erro', 'Erro ao tentar alterar dados do submenu')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}