import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    meusTickets: [],
    dadosSetor: [],
    dadosCategoria: [],
    ticketsSetor: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return {...state, loading: action.payload}

        //Caso para guardar os tickets do menu 'meutickets'
        case type.BUSCAR_MEUS_TICKETS:
            return { ...state, meusTickets: action.payload.data || INITIAL_STATE.meusTickets, loading: false }        

        //
        case type.BUSCAR_MEU_SETOR:
            return { ...state, dadosSetor: action.payload.data || INITIAL_STATE.dadosSetor, loading: false }        

        //
        case type.BUSCAR_MINHAS_CATEGORIAS:
            return { ...state, dadosCategoria: action.payload.data || INITIAL_STATE.dadosCategoria, loading: false }        

        //Caso para guardar os tickets do menu 'tickets do setor'
        case type.BUSCAR_TICKETS_SETOR:
            return { ...state, ticketsSetor: action.payload.data || INITIAL_STATE.ticketsSetor, loading: false }        

        default:
            return state;   

    }

}