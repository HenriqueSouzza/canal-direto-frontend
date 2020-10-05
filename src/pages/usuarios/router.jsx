import React from 'react';

import { Route, Switch } from 'react-router-dom';

//import Cadastrar from './cadastrar';

import Editar from './editar';

import Usuario from './index';

function Router(){
    return(
        <Switch>
            <Route exact path='/usuario' component={ props => <Usuario {...props} />} />
            {/* <Route exact path='/usuario/novo' component={ props => <Cadastrar {...props} />} /> */}
            <Route exact path='/usuario/:id/editar' component={ props => <Editar {...props} />} />
        </Switch>
    )
}

export default Router;