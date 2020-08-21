import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Dashboard from '../../pages/dashboard/router';

import PaginaNaoEncontrada from '../../pages/errosPagina/paginaNaoEncontrada';
 
import Tickets from '../../pages/tickets/router';

import TicketsSetor from '../../pages/ticketsSetor/router';

import Setor from '../../pages/setor/router';

import Categoria from '../../pages/setor/categoria/router';

import Sair from '../../pages/sair/router';


function Content(){
    return(
        <div className="content-wrapper">
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/tickets' component={Tickets} />
                <Route path='/tickets-setor' component={TicketsSetor} />
                <Route path='/setor' component={Setor} />
                <Route path='/categoria' component={Categoria} />
                <Route path='/sair' component={Sair} />
                <Route path="*" component={PaginaNaoEncontrada}/>
            </Switch>
        </div>
    )
}

export default Content;