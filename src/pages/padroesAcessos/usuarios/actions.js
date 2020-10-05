import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  '../types';

import { BASE_API } from '../../../config/const';


export const buscarUsuarios = (params = '') => {

    const endPoint = BASE_API + 'api/usuarios' + params;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_USUARIOS, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}


export const alterarUsuario = (params, id) => {

    const endPoint = BASE_API + 'api/usuarios/' + id;

    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers: headers })
        .then(response => {

            toastr.success('Sucesso', 'Status alterado com sucesso')
            dispatch(buscarUsuarios('?where[id]=' + id))
            
        })
        .catch(error => {

            console.log(error.response)
            toastr.error('Erro', 'Não foi possível alterar os padrões de acesso do usuário')
            dispatch({type: type.LOAD, payload: false})

        })
    }
}