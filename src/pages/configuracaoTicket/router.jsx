import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Formularios from './formularios/index';
import FormulariosNovo from './formularios/novo';
import FormulariosVisualizar from './formularios/visualizar';

import CamposFormularios from './camposFormularios/index';
import CamposFormulariosNovo from './camposFormularios/novo';
import CamposFormulariosVisualizar from './camposFormularios/visualizar';

import StatusTicket from './statusTicket/index';
import StatusTicketNovo from './statusTicket/novo';
import StatusTicketVisualizar from './statusTicket/visualizar';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';


function Router(){
    
    return(
        <Switch>
            <Route exact path='/configuracao-ticket/formularios' component={ props => <Formularios {...props} />} />
            <Route exact path='/configuracao-ticket/formularios/novo' component={ props => <FormulariosNovo {...props} />} />
            <Route exact path='/configuracao-ticket/formularios/:id/visualizar' component={ props => <FormulariosVisualizar {...props} />} />

            <Route exact path='/configuracao-ticket/campos-formularios' component={ props => <CamposFormularios {...props} />} />
            <Route exact path='/configuracao-ticket/campos-formularios/novo' component={ props => <CamposFormulariosNovo {...props} />} />
            <Route exact path='/configuracao-ticket/campos-formularios/:id/visualizar' component={ props => <CamposFormulariosVisualizar {...props} />} />

            <Route exact path='/configuracao-ticket/status-ticket' component={ props => <StatusTicket {...props} />} />
            <Route exact path='/configuracao-ticket/status-ticket/novo' component={ props => <StatusTicketNovo {...props} />} />
            <Route exact path='/configuracao-ticket/status-ticket/:id/visualizar' component={ props => <StatusTicketVisualizar {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;