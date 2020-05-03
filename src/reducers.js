import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//
import DadosCadastraisReducer from './pages/dadosCadastrais/reducer';

//Atividades complementares
// import AtvAlunosReducer from './pages/inscricoes/alunos/reducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    auth: AuthReducer,
    dashboard: () => ({ test: 1500 }),
    dadosCadastrais: DadosCadastraisReducer,
    /*** Atividades complementares ***/
    // atvAlunos: AtvAlunosReducer,
})

export default rootReducer; 