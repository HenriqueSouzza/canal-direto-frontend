import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN } from '../../../config/const';

/**
 * método para buscar os dados do usuario
 */
export const buscarDadosEvento = (params) => {

    const endPoint = '/api/evento/' + params;

    const headers = { Authorization: TOKEN }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_EVENTO, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            // console.log(error.response)
            if(error.response.data.error == 401){
                toastr.error('Erro', 'Desculpe, você não tem permissão para acessar')
            }else{
                toastr.error('Erro', 'Houve um erro, tente novamente, caso persista entrar em contato com nossa equipe UNIDOS !')
            }

        })
    }

}

/**
 * método para buscar dados do cep
 */
export const buscarCep = (params) => {

    const endPoint = 'https://viacep.com.br/ws/'+ params + '/json'

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint)
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_CEP, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            console.log(error.response)

        })
    }

}

