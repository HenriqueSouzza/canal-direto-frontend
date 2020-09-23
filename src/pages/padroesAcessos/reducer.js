import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    papeis: {},
    permissoes: {},
    permissoesPapeis: {},
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

        //Caso para guardar as permissoes atreladas aos papeis
        case type.BUSCAR_PERMISSOES_PAPEIS:
            return { ...state, permissoesPapeis: action.payload.data || INITIAL_STATE.permissoesPapeis, loading: false }        

        default:
            return state;   

    }

}