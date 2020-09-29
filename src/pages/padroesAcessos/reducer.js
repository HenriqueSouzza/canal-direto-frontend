import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    papeis: {},
    permissoes: {},
    setor: {},
    categoria: {},
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

        //Caso para guardar os papeis existentes
        case type.BUSCAR_PAPEIS:
            return { ...state, papeis: action.payload.data || INITIAL_STATE.papeis, loading: false }
            
        //Caso para guardar as permissoes existentes
        case type.BUSCAR_PERMISSOES:
            return { ...state, permissoes: action.payload.data || INITIAL_STATE.permissoes, loading: false }   

        //Caso para guardar os setores existentes
        case type.BUSCAR_SETOR:
            return { ...state, setor: action.payload.data || INITIAL_STATE.setor, loading: false }   

        //Caso para guardar os setores existentes
        case type.BUSCAR_CATEGORIA:
            return { ...state, categoria: action.payload.data || INITIAL_STATE.categoria, loading: false }   

        //Caso para guardar os formularios existentes
        case type.BUSCAR_FORMULARIOS:
            return { ...state, formularios: action.payload.data || INITIAL_STATE.formularios, loading: false }        

        //Caso para guardar os campos formularios existentes
        case type.BUSCAR_CAMPOS_FORMULARIOS:
            return { ...state, camposFormularios: action.payload.data || INITIAL_STATE.camposFormularios, loading: false }        

        //Caso para guardar os status existentes
        case type.BUSCAR_STATUS_TICKET:
            return { ...state, statusTicket: action.payload.data || INITIAL_STATE.statusTicket, loading: false } 

        default:
            return state;   

    }

}