import React from 'react';

import { Route, Switch } from 'react-router-dom';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';

import Papeis from './papeis/index';

import PapeisVisualizar from './papeis/visualizar';

import PapeisNovo from './papeis/novo';

import Permissoes from './permissoes/index';

import Setor from './setor';

import SetorVisualizar from './setor/visualizar';

import SetorNovo from './setor/novo';

function Router(){
    
    return(
        <Switch>
            <Route exact path='/padroes-acessos/papeis' component={ props => <Papeis {...props} />} />
            <Route exact path='/padroes-acessos/papeis/:id/visualizar' component={ props => <PapeisVisualizar {...props} />} />
            <Route exact path='/padroes-acessos/papeis/novo' component={ props => <PapeisNovo {...props} />} />

            <Route exact path='/padroes-acessos/permissoes' component={ props => <Permissoes {...props} />} />

            <Route exact path='/padroes-acessos/setor' component={ props => <Setor {...props} />} />
            <Route exact path='/padroes-acessos/setor/:id/visualizar' component={ props => <SetorVisualizar {...props} />} />
            <Route exact path='/padroes-acessos/setor/novo' component={ props => <SetorNovo {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;