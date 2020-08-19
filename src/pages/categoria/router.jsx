import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Cadastrar from './cadastrar';
import Categoria from './index';
import Editar from './editar';

function Router(){
    return(
        <Switch>
            <Route exact path='/categoria' component={ props => <Categoria {...props} />} />
            <Route exact path='/categoria/novo/:id' component={ props => <Cadastrar {...props} />} />
            <Route exact path='/categoria/:id/editar' component={ props => <Editar {...props} />} />
            
        </Switch>
    )
}

export default Router;