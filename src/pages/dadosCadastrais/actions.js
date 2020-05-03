import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN } from '../../config/const';

/**
 * método provisório de login do gestor online
 */
export const buscarDados = (params) => {

    const endPoint = '/api/pessoa/' + params;

    const headers = { Authorization: 'aa'}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            // dispatch({ type: type.BUSCAR_DADOS, payload: response })
            // router.goBack()
            // toastr.success('Sucesso', response.data.message)
            
        })
        .catch(error => {

            // console.log(error.response)
            if(error.response.data.error == 401){
                toastr.error('Erro', 'Desculpe, você não tem permissão para acessar')
            }else{
                toastr.error('Erro', 'Houve um erro, tente novamente, caso persista entrar em contato com nossa equipe UNIDOS !')
            }
            toastr.error('Erro', error.response.data.message)
            dispatch({type: type.ERROR, payload: false})

        })
    }

}