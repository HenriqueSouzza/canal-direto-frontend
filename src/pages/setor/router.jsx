import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Cadastrar from './cadastrar';

import Editar from './editar';

import Setor from './index';

function Router(){
    return(
        <Switch>
            <Route exact path='/setor' component={ props => <Setor {...props} />} />
            <Route exact path='/setor/novo' component={ props => <Cadastrar {...props} />} />
            <Route exact path='/setor/:id/editar' component={ props => <Editar {...props} />} />
        </Switch>
    )
}

export default Router;