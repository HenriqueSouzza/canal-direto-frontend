import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    formularios: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return {...state, loading: action.payload}

        //Caso para guardar os formularios existentes
        case type.BUSCAR_FORMULARIOS:
            return { ...state, formularios: action.payload.data || INITIAL_STATE.formularios, loading: false }        

        default:
            return state;   

    }

}