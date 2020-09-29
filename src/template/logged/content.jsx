import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Dashboard from '../../pages/dashboard/router';

import PaginaNaoEncontrada from '../../pages/errosPagina/paginaNaoEncontrada';
 
import ConfiguracaoTicket from '../../pages/configuracaoTicket/router';

import MeusTickets from '../../pages/meusTickets/router';

import TicketsSetor from '../../pages/ticketsSetor/router';

import Setor from '../../pages/setor/router';

import Categoria from '../../pages/setor/categoria/router';

import PadroesAcessos from '../../pages/padroesAcessos/router';

import Usuario from '../../pages/usuarios/router';


function Content(){
    return(
        <div className="content-wrapper">
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/configuracao-ticket' component={ConfiguracaoTicket} />
                <Route path='/meus-tickets' component={MeusTickets} />
                <Route path='/tickets-setor' component={TicketsSetor} />
                <Route path='/setor' component={Setor} />
                <Route path='/categoria' component={Categoria} />
                <Route path='/padroes-acessos' component={PadroesAcessos} />
                <Route path='/usuario' component={Usuario} />
                <Route path='*' component={PaginaNaoEncontrada}/>
            </Switch>
        </div>
    )
}

export default Content;