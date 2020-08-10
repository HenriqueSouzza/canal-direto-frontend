import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Cadastrar from './cadastrar';

function Router(){
    return(
        <Switch>
            <Route exact path='/setor/cadastrar' component={ props => <Cadastrar {...props} />} />
            
        </Switch>
    )
}

export default Router;