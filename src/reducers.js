import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Dados Cadastrais
import DadosCadastraisReducer from './pages/dadosCadastrais/reducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    dashboard: () => ({ test: 1500 }),
    auth: AuthReducer,
    dadosCadastrais: DadosCadastraisReducer,
})

export default rootReducer; 