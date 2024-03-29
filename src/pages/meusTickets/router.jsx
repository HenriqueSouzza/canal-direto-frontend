import React from 'react';

import { Route, Switch } from 'react-router-dom';

import TicketsAbertos from './abertos/index';

import TicketsAbertosVisualizar from './abertos/visualizar';

import NovoTicket from './novo/index';

import NovoReciboTicket from './novo/recibo';

import TicketsFechados from './fechados/index';

import TicketsFechadosVisualizar from './fechados/visualizar';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';


function Router(){
    
    return(
        <Switch>
            <Route exact path='/meus-tickets/novo' component={ props => <NovoTicket {...props} />} />
            <Route exact path='/meus-tickets/novo/:id/recibo' component={ props => <NovoReciboTicket {...props} />} />

            <Route exact path='/meus-tickets/abertos' component={ props => <TicketsAbertos {...props} />} />
            <Route exact path='/meus-tickets/abertos/:id/visualizar' component={ props => <TicketsAbertosVisualizar {...props} />} />

            <Route exact path='/meus-tickets/fechados' component={ props => <TicketsFechados {...props} />} />
            <Route exact path='/meus-tickets/fechados/:id/visualizar' component={ props => <TicketsFechadosVisualizar {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;