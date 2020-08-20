import axios from 'axios';

import { toastr } from 'react-redux-toastr';

import type from  './types';

import { TOKEN, BASE_API } from '../../../config/const';
import { param } from 'jquery';



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
export const cadastrarCategoria = (params, router) => {

    const endPoint = BASE_API + 'api/canal-direto/categoria';

    const headers = { Authorization: TOKEN }

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})
        
        axios.post(endPoint, params, { headers : headers })
        .then(response => {
            
            toastr.success('Sucesso', 'Dados Cadastrados com sucesso !')

            //dispatch(buscarDadosUsuario(user))
            dispatch({type: type.LOAD, payload: false})
            router.goBack()
            
        })
        .catch(error => {

            //console.log(error.response)
            // toastr.error('Erro', 'Houve um erro ao tentar alterar seus dados, tente novamente, caso erro persista, favor entrar em contato com a equipe UNIDOS')
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

    const headers = { Authorization: TOKEN }

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
export const buscarDadosCategoria = (idSetor= null ) => {

    const endPoint = BASE_API +'api/canal-direto/categoria?where[id_setor]='+ idSetor;

    //const headers = { Authorization: TOKEN}
    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_CATEGORIA, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            //console.log(error.response)


        })
    }

}

/**
 * método para buscar os dados do usuario
 */
export const buscarDadosCategoriaId = (idCategoria= null ) => {

    const endPoint = BASE_API +'api/canal-direto/categoria/'+idCategoria;

    //const headers = { Authorization: TOKEN}
    const headers = {}

    return dispatch => {

        dispatch({type: type.LOAD, payload: true})

        axios.get(endPoint, { headers: headers })
        .then(response => {
            
            dispatch({ type: type.BUSCAR_DADOS_CATEGORIA_FILTER, payload: response })
            
        })
        .catch(error => {

            dispatch({type: type.LOAD, payload: false})

            //console.log(error.response)


        })
    }

}





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