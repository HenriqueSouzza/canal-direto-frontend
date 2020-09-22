import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Auth from './auth';

// import EsqueciSenha from './esqueciSenha';

import PaginaNaoEncontrada from './paginaNaoEncontrada';

function Router(){
    return(
        <Switch>
            <Route exact path='/' component={ props => <Auth {...props} />} />
            {/* <Route exact path='/esqueci-senha' component={ props => <EsqueciSenha {...props} />} /> */}
            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
}

export default Router;