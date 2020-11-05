import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Dashboard from '../../pages/dashboard/router';

import PaginaNaoEncontrada from '../../pages/errosPagina/paginaNaoEncontrada';
 
import MeusTickets from '../../pages/meusTickets/router';

import MeusTicketsPaginaInicial from '../../pages/meusTickets/abertos/index';

import TicketsSetor from '../../pages/ticketsSetor/router';

import PadroesAcessos from '../../pages/padroesAcessos/router';


function Content(){
    return(
        <div className="content-wrapper">
            <Switch>
                <Route exact path='/' component={MeusTicketsPaginaInicial} />
                <Route path='/meus-tickets' component={MeusTickets} />
                <Route path='/tickets-setor' component={TicketsSetor} />
                <Route path='/padroes-acessos' component={PadroesAcessos} />
                <Route path='*' component={PaginaNaoEncontrada}/>
            </Switch>
        </div>
    )
}

export default Content;