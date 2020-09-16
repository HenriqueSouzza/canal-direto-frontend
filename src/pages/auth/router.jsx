import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Auth from './auth';

import EsqueciSenha from './esqueciSenha';


function Router(){
    return(
        <Switch>
            <Route exact path='/' component={ props => <Auth {...props} />} />
            <Route exact path='/esqueci-senha' component={ props => <EsqueciSenha {...props} />} />
        </Switch>
    )
}

export default Router;