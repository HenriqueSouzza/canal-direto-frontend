import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN, BASE_API } from '../../config/const';

/**
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarMeusTickets = (params) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket?where[usuario]=' + params;

    const headers = { Authorization: ''}

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
 * Método para os buscar os tickets no menu "meu ticket" do usuário que está logado
 */
export const buscarTicketsSetor = (params) => {

    const endPoint = BASE_API + 'api/canal-direto/ticket?where[setor]=' + params;

    const headers = { Authorization: ''}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_TICKETS_SETOR, payload: response })
            
        })
        .catch(error => {

            console.log(error)
            dispatch({type: type.LOAD, payload: false})

        })
    }

}


// /**
//  * Método responsável para alterar senha
//  * @param {*} params 
//  * @param {*} router 
//  */
// export const alterarDadosUsuario = (params, user, router) => {

//     const endPoint = '/api/pessoa/' + user;

//     const headers = { Authorization: TOKEN }

//     return dispatch => {

//         dispatch({type: type.LOAD, payload: true})
        
//         axios.put(endPoint, params, { headers : headers })
//         .then(response => {
            
//             toastr.success('Sucesso', 'Dados atualizados com sucesso !')

//             dispatch(buscarDadosUsuario(user))
            
            
//         })
//         .catch(error => {

//             console.log(error.response.data.error)
//             toastr.error('Erro', 'Houve um erro ao tentar alterar seus dados, tente novamente, caso erro persista, favor entrar em contato com a equipe UNIDOS')
//             dispatch({type: type.LOAD, payload: false})

//         })
//     }
// }


// /**
//  * Método responsável para alterar senha
//  * @param {*} params 
//  * @param {*} router 
//  */
// export const alterarSenha = (params, user, router) => {

//     const endPoint = '/api/pessoa/' + user;

//     const headers = { Authorization: TOKEN }

//     return dispatch => {

//         dispatch({type: type.LOAD, payload: true})

//         axios.put(endPoint, params, { headers : headers })
//         .then(response => {

//             toastr.success('Sucesso', 'Sua senha foi alterada com sucesso !')

//             dispatch({type: type.LOAD, payload: false})
            
//             router.push('/dados-cadastrais/meus-dados')
            
//         })
//         .catch(error => {

//             console.log(error.response.data.error)
//             toastr.error('Erro', 'Houve um erro ao tentar alterar sua senha, tente novamente, caso erro persista, favor entrar em contato com a equipe UNIDOS')
//             dispatch({type: type.ERROR, payload: false})

//         })
//     }
// }

// /**
//  * 
//  */
// export const buscarCongregacoes = () => {

//     const endPoint = '/api/congregacao';

//     return dispatch => {

//         dispatch({type: type.LOAD, payload: true})
        
//         axios.get(endPoint)
//         .then(response => {

//             dispatch({type: type.BUSCAR_CONGREGACAO, payload: response})
            
//         })
//         .catch(error => {

//             if(error.response.data.error == 401){
//                 toastr.error('Erro', 'Acesso negado')
//             }else{
//                 toastr.error('Erro', 'Ops ! Houve um erro para buscar as congregações diponíveis, tente novamente, caso persista o erro, entre em contato com a equipe UNIDOS.')
//             }
            
//             dispatch({type: type.LOAD, payload: false})

//         })
//     }
// }