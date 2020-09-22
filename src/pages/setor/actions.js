import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API, USER_LOGGED } from '../../config/const';


/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const cadastrarSetor = (params, router) => {

    params.usuario = USER_LOGGED.usuario

    const endPoint = BASE_API + 'api/canal-direto/setor';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')

            dispatch(buscarDadosSetor())

            router.push('/setor/' + response.data.response.content.setor + '/editar')
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao tentar cadastrar novo setor')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}


/**
 * método para buscar os dados do usuario
 */
export const buscarDadosSetor = () => {

    const endPoint = BASE_API +'api/canal-direto/setor';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_DADOS_SETOR, payload: response })
            
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
export const alterarSetor = (params, id) => {

    const endPoint = BASE_API +'api/canal-direto/setor/' + id;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Cadastro alterado com sucesso !')
            dispatch(buscarDadosSetor())

        })
        .catch(error => {

            toastr.error('Erro', 'Erro ao tentar alterar dados do setor')
            dispatch({type: type.ERROR, payload: false})

        })
    }
}