import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Atividades complementares
import AtvAlunosReducer from './pages/inscricoes/alunos/reducer';

const rootReducer = combineReducers({
    dashboard: () => ({ test: 1500 }),
    toastr: toastrReducer,
    /*** Auth ***/
    auth: AuthReducer,
    /*** Atividades complementares ***/
    atvAlunos: AtvAlunosReducer,
})

export default rootReducer; 