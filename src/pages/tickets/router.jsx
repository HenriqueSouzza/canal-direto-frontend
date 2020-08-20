import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MeusTickets from './meusTickets/index';

import MeusTicketsNovo from './meusTickets/novo';

import MeusTicketsVisualizar from './meusTickets/visualizar';



function Router(){
    
    return(
        <Switch>
            <Route exact path='/tickets/meus-tickets' component={ props => <MeusTickets {...props} />} />
            <Route exact path='/tickets/meus-tickets/novo' component={ props => <MeusTicketsNovo {...props} />} />
            <Route exact path='/tickets/meus-tickets/:id/visualizar' component={ props => <MeusTicketsVisualizar {...props} />} />
        </Switch>
    )
    
}

export default Router;