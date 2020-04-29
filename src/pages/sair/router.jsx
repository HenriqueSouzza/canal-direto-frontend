import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Index from './index';

function Router(){
    return(
        <Switch>
            <Route exact path='/sair' component={ props => <Index {...props} />} />
        </Switch>
    )
}

export default Router;