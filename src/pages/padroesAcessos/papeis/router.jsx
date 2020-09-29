import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Papeis from './index';

import PapeisVisualizar from './visualizar';

import PapeisNovo from './novo';

import SetorNovo from './setorNovo';

import SetorVisualizar from './setorVisualizar';

import PaginaNaoEncontrada from '../../errosPagina/paginaNaoEncontrada';

function Router(){
    
    return(
        <Switch>
            <Route exact path='/padroes-acessos/papeis' component={ props => <Papeis {...props} />} />

            <Route exact path='/padroes-acessos/papeis/:id/visualizar' component={ props => <PapeisVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/papeis/:id/visualizar/:setor/setor-papeis' component={ props => <SetorVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/papeis/novo' component={ props => <PapeisNovo {...props} />} />

            <Route exact path='/padroes-acessos/papeis/novo/setor-papeis' component={ props => <SetorNovo {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;