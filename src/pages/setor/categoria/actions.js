import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { BASE_API, USER_LOGGED } from '../../../config/const';


/**
 * método para buscar os dados do usuario
 */
export const buscarDadosSetor = () => {

    const endPoint = BASE_API + 'api/canal-direto/setor';

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
export const cadastrarCategoria = (params, router) => {

    params.usuario = USER_LOGGED.usuario

    const endPoint = BASE_API + 'api/canal-direto/categoria';

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')
            dispatch({type: type.LOAD, payload: false})
            router.goBack()
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Erro ao tentar cadastrar categoria')
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

    const endPoint = BASE_API + 'api/canal-direto/categoria/'+idCategoria;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.put(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Atualizados com sucesso !')
            //dispatch(buscarDadosUsuario(user))
            dispatch({type: type.LOAD, payload: false})
            
            
        })
        .catch(error => {

            //console.log(error.response)
            // toastr.error('Erro', 'Houve um erro ao tentar alterar seus dados, tente novamente, caso erro persista, favor entrar em contato com a equipe UNIDOS')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}


/**
 * método para buscar os dados do usuario
 */
export const buscarDadosCategoria = (idSetor = null ) => {

    const endPoint = BASE_API +'api/canal-direto/categoria?where[id_setor]='+ idSetor;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_CATEGORIA, payload: response })
            
        })
        .catch(error => {

            //console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}

/**
 * método para buscar os dados do usuario
 */
export const buscarDadosCategoriaId = (idCategoria= null ) => {

    const endPoint = BASE_API +'api/canal-direto/categoria/'+idCategoria;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_CATEGORIA_FILTER, payload: response })
            
        })
        .catch(error => {

            // console.log(error.response)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}