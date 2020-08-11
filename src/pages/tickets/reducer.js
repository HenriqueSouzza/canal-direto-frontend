import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    meusTickets: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return {...state, loading: action.payload}

        //Caso para Guar
        case type.BUSCAR_MEUS_TICKETS:
            return { ...state, dadosUsuario: action.payload.data || INITIAL_STATE.list, loading: false }        

        default:
            return state;   

    }

}