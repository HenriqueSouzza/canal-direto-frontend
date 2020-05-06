import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    list: [],
    congregacao: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return { ...state, loading: action.payload }

        case type.GUARDAR_CONGREGACAO:
            return { ...state, congregacao: action.payload.data || INITIAL_STATE.congregacao, loading: false } 

        //Caso para Guardar token
        case type.GUARDAR_TOKEN:
            sessionStorage.setItem('token', action.payload.data.token)
            sessionStorage.setItem('user', JSON.stringify(action.payload.data.pessoa))
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        

        default:
            return state;   

    }

}