import React from 'react';

import { Route, Switch } from 'react-router-dom';

import TicketsAbertos from './abertos/index';

import TicketsAbertosVisualizar from './abertos/visualizar';

import NovoTicket from './novo';

import ReciboTicket from './recibo';

import TicketsFechados from './fechados/index';

import TicketsFechadosVisualizar from './fechados/visualizar';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';


function Router(){
    
    return(
        <Switch>
            <Route exact path='/meus-tickets/novo-ticket' component={ props => <NovoTicket {...props} />} />
            <Route exact path='/meus-tickets/:id/recibo' component={ props => <ReciboTicket {...props} />} />

            <Route exact path='/meus-tickets/abertos' component={ props => <TicketsAbertos {...props} />} />
            <Route exact path='/meus-tickets/abertos/:id/visualizar' component={ props => <TicketsAbertosVisualizar {...props} />} />

            <Route exact path='/meus-tickets/fechados' component={ props => <TicketsFechados {...props} />} />
            <Route exact path='/meus-tickets/fechados/:id/visualizar' component={ props => <TicketsFechadosVisualizar {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;