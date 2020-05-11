import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Dados Cadastrais
import DadosCadastraisReducer from './pages/dadosCadastrais/reducer';

//Dados Cadastrais
import AcampUnidosReducer from './pages/acampUnidos/inscrever/reducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    auth: AuthReducer,
    dashboard: () => ({ test: 1500 }),
    dadosCadastrais: DadosCadastraisReducer,
    acampUnidos: AcampUnidosReducer,
})

export default rootReducer; 