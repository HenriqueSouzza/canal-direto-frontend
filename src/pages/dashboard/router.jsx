import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Index from './index';

function Router(){
    return(
        <Switch>
            <Route exact path='/' component={ props => <Index {...props} />} />
        </Switch>
    )
}

export default Router;