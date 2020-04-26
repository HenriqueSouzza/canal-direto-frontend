import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Auth from './auth';

import Cadastro from './cadastro';

function Router(){
    return(
        <Switch>
            <Route exact path='/' component={ props => <Auth {...props} />} />
            <Route exact path='/cadastro' component={ props => <Cadastro {...props} />} />
        </Switch>
    )
}

export default Router;