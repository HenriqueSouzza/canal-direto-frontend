import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Cadastrar from './cadastrar';

function Router(){
    return(
        <Switch>
            <Route exact path='/categoria/cadastrar' component={ props => <Cadastrar {...props} />} />
            
        </Switch>
    )
}

export default Router;