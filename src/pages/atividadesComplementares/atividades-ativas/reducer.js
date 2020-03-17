import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    list: [],
    listSelect: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return { ...state, loading: action.payload }        
        
        //Caso retornar algum erro
        case type.ERROR:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }

        //Caso para buscar as caterias e atualizar os estados
        case type.BUSCAR_ATIVIDADES_ATIVAS:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        
        
        case type.BUSCAR_ATIVIDADES_ATIVAS_SELECT:
            return { ...state, listSelect: action.payload.data || INITIAL_STATE.listSelect, loading: false }        

        default:
            return state;   

    }

}