import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    formularios: [],
    camposFormularios: [],
    statusTicket: [],
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

        //Caso para guardar os formularios existentes
        case type.BUSCAR_CAMPOS_FORMULARIOS:
            return { ...state, camposFormularios: action.payload.data || INITIAL_STATE.camposFormularios, loading: false }        

        //Caso para guardar os status existentes
        case type.BUSCAR_STATUS_TICKET:
            return { ...state, statusTicket: action.payload.data || INITIAL_STATE.statusTicket, loading: false }        

        default:
            return state;   

    }

}