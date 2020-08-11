import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MeusTickets from './meusTickets/index';

import TicketsSetor from './ticketsSetor/index';

function Router(){
    return(
        <Switch>
            <Route exact path='/tickets/meus-tickets' component={ props => <MeusTickets {...props} />} />
            <Route exact path='/tickets/tickets-setor' component={ props => <TicketsSetor {...props} />} />
        </Switch>
    )
}

export default Router;