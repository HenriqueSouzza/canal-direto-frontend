import React from 'react';

import { Route, Switch } from 'react-router-dom';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';

import Papeis from './papeis/index';

import PapeisVisualizar from './papeis/visualizar';

import Permissoes from './permissoes/index';

import PermissoesVisualizar from './permissoes/visualizar';

import PermissoesPapeis from './permissoesPapeis/index';

import PermissoesPapeisVisualizar from './permissoesPapeis/visualizar';


function Router(){
    
    return(
        <Switch>
            <Route exact path='/padroes-acessos/papeis' component={ props => <Papeis {...props} />} />
            <Route exact path='/padroes-acessos/papeis/:id/visualizar' component={ props => <PapeisVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/permissoes' component={ props => <Permissoes {...props} />} />
            <Route exact path='/padroes-acessos/permissoes/:id/visualizar' component={ props => <PermissoesVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/permissoes-papeis' component={ props => <PermissoesPapeis {...props} />} />
            <Route exact path='/padroes-acessos/permissoes-papeis/:id/visualizar' component={ props => <PermissoesPapeisVisualizar {...props} />} />
            
            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;