import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    list: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return { ...state, loading: action.payload }

        //Caso para Guardar token
        case type.GUARDAR_TOKEN:
            sessionStorage.setItem('token', action.payload.data.response.content.access_token)
            // sessionStorage.setItem('user', JSON.stringify(action.payload.data.pessoa))
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        

        //Caso para Remove token
        case type.REMOVER_TOKEN:
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        

        default:
            return state;   

    }

}