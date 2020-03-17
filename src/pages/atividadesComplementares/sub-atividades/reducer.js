import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    list: [],
    grupoSelect: [],
    atividadeSelect: [],
    loading: false,
    loadingSelect: false,
    formEditData: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return { ...state, loading: action.payload }

        case type.LOAD_SELECT:
                return { ...state, loadingSelect: action.payload } 

        //Caso retornar algum erro
        case type.ERROR:
            return { ...state, loading: false, loadingSelect: false }

        //Caso para buscar grupo de atividades
        case type.BUSCAR_SUB_ATIVIDADE:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        

        //
        case type.FORM_SUB_ATIVIDADE:
            const arrChave = Object.keys(action.payload.data)
            const chave = arrChave[0] + 'Select'
            return { ...state, [chave]: action.payload.data || INITIAL_STATE.listSelect, loadingSelect: false, loading: false } 

        case type.FORM_EDIT_SUB_ATIVIDADE:
            return {...state, formEditData: action.payload.data || INITIAL_STATE.list, loadingSelect: false}

        default:
            return state;   

    }

}