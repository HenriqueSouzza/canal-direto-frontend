import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    dadosSetor: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return {...state, loading: action.payload}

        //Caso para Guar
        case type.BUSCAR_DADOS_SETOR:
            return { ...state, dadosSetor: action.payload.data || INITIAL_STATE.dadosSetor, loading: false }        

        default:
            return state;   

    }

}