import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Dados Cadastrais
import DadosCadastraisReducer from './pages/dadosCadastrais/reducer';

//Setor
import SetorReducer from './pages/setor/reducer';

//Categoria
import CategoriaReducer from './pages/setor/categoria/reducer';

//Ticket
import TicketsReducer from './pages/tickets/reducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    dashboard: () => ({ test: 1500 }),
    auth: AuthReducer,
    dadosCadastrais: DadosCadastraisReducer,
    setor: SetorReducer,
    categoria: CategoriaReducer,
    tickets: TicketsReducer,
})

export default rootReducer; 