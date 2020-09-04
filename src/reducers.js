import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Configuração Ticket
import ConfiguracaoTicketReducer from './pages/configuracaoTicket/reducer';

//Meus Ticket
import MeusTicketsReducer from './pages/meusTickets/reducer';

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
    configuracaoTicket: ConfiguracaoTicketReducer,
    ticketsSetor: TicketsSetorReducer,
    meusTickets: MeusTicketsReducer,
    setor: SetorReducer,
    categoria: CategoriaReducer,
})

export default rootReducer; 