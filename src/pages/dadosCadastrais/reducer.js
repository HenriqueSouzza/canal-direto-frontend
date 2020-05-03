import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    list: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        //Caso para apresentar o load na tela quando for true
        case type.LOAD_DADOS:
            return { ...state, loading: action.payload }

        //Caso retornar algum erro
        case type.ERROR_DADOS:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }

        //Caso para Guar
        case type.BUSCAR_DADOS:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        

        default:
            return state;   

    }

}