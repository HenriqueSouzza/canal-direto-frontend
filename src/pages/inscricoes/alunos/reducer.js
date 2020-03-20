import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    list: [],
    periodoSelect: [],
    grupoSelect: [],
    atividadeSelect: [],
    subatividadeSelect: [],
    loading: false,
    loadingSelect: false,
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        
        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return { ...state, loading: action.payload }        
        
        case type.LOAD_SELECT:
            return { ...state, loadingSelect: action.payload }        

        //Caso der algum erro
        case type.ERROR:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false }        

        //Caso para buscar os alunos inscritos e atualizar os estados
        case type.BUSCAR_ALUNOS_INSCRITOS:
            return { ...state, list: action.payload.data || INITIAL_STATE.list, loading: false } 

        //Caso para trazer o resultado se for deletado ou não 
        case type.ALUNOS_INSCRITOS_FORM:
            const arrChave = Object.keys(action.payload[0].data)
            const chave = arrChave[0] + 'Select'
            return { ...state, [chave]: action.payload[0].data || INITIAL_STATE.listSelect, loadingSelect: false, loading: false } 
        
        default:
            return state;   

    }

}