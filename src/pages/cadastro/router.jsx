import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Cadastro from './cadastro';

function Router(props){

    return(
        <Switch>
            <Route exact path='/cadastro' component={ props => <Cadastro {...props} />} />
        </Switch>
    )

}

export default Router;