import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {},
    dataLogged: sessionStorage.getItem('dataLogged') ? JSON.parse(sessionStorage.getItem('dataLogged')) : {},
    papel: sessionStorage.getItem('papel') ? JSON.parse(sessionStorage.getItem('papel')) : {},
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        //Caso para apresentar o load na tela quando for true
        case type.LOAD_AUTH:
            return { ...state, loading: action.payload }

        //Caso para Guardar token
        case type.GUARDAR_TOKEN:
            sessionStorage.setItem('dataLogged', JSON.stringify(action.payload.data.response.content))
            return { ...state, dataLogged: action.payload.data.response.content || INITIAL_STATE.dataLogged, loading: false }        
            
        //Caso para Remove token
        case type.REMOVER_TOKEN:
            sessionStorage.removeItem('dataLogged');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('papel');
            return { ...state, dataLogged: action.payload, loading: false }        
                
        //Caso para guardar os dados do usuario logado
        case type.GUARDAR_DATA_LOGIN_USER:
            sessionStorage.setItem('user', JSON.stringify(action.payload.data.response.content))
            return { ...state, user: action.payload.data.response.content || INITIAL_STATE.user, loading: false }        

        //Caso para guardar os dados do usuario logado
        case type.GUARDAR_PAPEL_USUARIO:
            sessionStorage.setItem('papel', JSON.stringify(action.payload.data.response.content))
            return { ...state, papel: action.payload.data.response.content || INITIAL_STATE.papel, loading: false }        

        default:
            return state;   

    }

}