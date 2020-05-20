import type from './types';

//Estado inicial da componente
const INITIAL_STATE = {
    dadosInscricao: [],
    dadosCep: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        //Caso para apresentar o load na tela quando for true
        case type.LOAD:
            return {...state, loading: action.payload}

        //Caso para guardar dados da congregacao
        case type.BUSCAR_DADOS_INSCRICAO:
            return { ...state, dadosInscricao: action.payload.data || INITIAL_STATE.list, loading: false }       
            
        //Caso para guardar os dados do cep
        case type.BUSCAR_DADOS_CEP:
            return { ...state, dadosCep: action.payload.data || INITIAL_STATE.list, loading: false }       
            

        default:
            return state;   

    }

}