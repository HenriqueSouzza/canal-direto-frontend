import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Meus Ticket
import MeusTicketsReducer from './pages/meusTickets/reducer';

//TicketSetor
import TicketsSetorReducer from './pages/ticketsSetor/reducer';

//PadroesAcessos
import PadroesAcessosReducer from './pages/padroesAcessos/reducer';


const rootReducer = combineReducers({
    toastr: toastrReducer,
    dashboard: () => ({ test: 1500 }),
    auth: AuthReducer,
    ticketsSetor: TicketsSetorReducer,
    meusTickets: MeusTicketsReducer,
    padroesAcessos: PadroesAcessosReducer
})

export default rootReducer; 