import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN, BASE_API, USER_LOGGED } from '../../config/const';




/**
 * Método responsável para alterar senha
 * @param {*} params 
 * @param {*} router 
 */
export const cadastrarSetor = (params, router) => {

    params.usuario = USER_LOGGED.usuario

    const endPoint = BASE_API + 'api/canal-direto/setor';

    const headers = { Authorization: TOKEN }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')
            let rota = '/setor/'+response.data.response.content.setor+'/editar'

            dispatch(buscarDadosSetor())

            router.push(rota)
            
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
export const buscarDadosSetor = (params=null) => {

    const endPoint = BASE_API +'api/canal-direto/setor';

    //const headers = { Authorization: TOKEN}
    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {

            dispatch({ type: type.BUSCAR_DADOS_SETOR, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            //console.log(error.response)


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

    const headers = { Authorization: TOKEN }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.put(endPoint, params, { headers : headers })
        .then(response => {

            toastr.success('Sucesso', 'Cadastro alterado com sucesso !')

            dispatch(buscarDadosSetor())
            
           //this.router.goBack()
            
        })
        .catch(error => {

            //console.log(error.response.data.error)
            toastr.error('Erro', 'Houve um erro ao tentar alterar sua senha, tente novamente, caso erro persista, favor entrar em contato com a equipe UNIDOS')
            dispatch({type: type.ERROR, payload: false})

        })
    }
}

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