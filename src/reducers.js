import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Ticket
import TicketsReducer from './pages/tickets/reducer';

//TicketSetor
import TicketsSetorReducer from './pages/ticketsSetor/reducer';

//Setor
import SetorReducer from './pages/setor/reducer';

//Categoria
import CategoriaReducer from './pages/setor/categoria/reducer';

const rootReducer = combineReducers({
    toastr: toastrReducer,
    dashboard: () => ({ test: 1500 }),
    auth: AuthReducer,
    ticketsSetor: TicketsSetorReducer,
    tickets: TicketsReducer,
    setor: SetorReducer,
    categoria: CategoriaReducer,
})

export default rootReducer; 