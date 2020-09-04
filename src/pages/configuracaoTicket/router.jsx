import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Formularios from './formularios/index';

import FormulariosVisualizar from './formularios/visualizar';

import FormulariosNovo from './formularios/novo';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';


function Router(){
    
    return(
        <Switch>
            <Route exact path='/configuracao-ticket/formularios' component={ props => <Formularios {...props} />} />
            <Route exact path='/configuracao-ticket/formularios/novo' component={ props => <FormulariosNovo {...props} />} />
            <Route exact path='/configuracao-ticket/formularios/:id/visualizar' component={ props => <FormulariosVisualizar {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;