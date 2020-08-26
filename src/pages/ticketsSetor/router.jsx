import React from 'react';

import { Route, Switch } from 'react-router-dom';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';

import MeuSetor from './paraMeuSetor/index';

import MeuSetorVisualizar from './paraMeuSetor/visualizar';

import MeusTickets from './meusTickets/index';

import MeusTicketsVisualizar from './meusTickets/visualizar';


function Router(){
    
    return(
        <Switch>
            <Route exact path='/tickets-setor/para-meu-setor' component={ props => <MeuSetor {...props} />} />
            <Route exact path='/tickets-setor/para-meu-setor/:id/visualizar' component={ props => <MeuSetorVisualizar {...props} />} />

            <Route exact path='/tickets-setor/meus-tickets' component={ props => <MeusTickets {...props} />} />
            <Route exact path='/tickets-setor/meus-tickets/:id/visualizar' component={ props => <MeusTicketsVisualizar {...props} />} />
            
            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;