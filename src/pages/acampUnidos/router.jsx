import React from 'react';

import { Route, Switch } from 'react-router-dom';

//Component de inscricao
import Inscrever  from './inscrever/inscrever';  

function Router(props){

    return(
        <Switch>
            {/*  */}
            <Route exact path='/acamp-unidos' component={ props => <Inscrever {...props} />} />
            <Route exact path='/acamp-unidos/inscrever' component={ props => <Inscrever {...props} />} />
        </Switch>
    )

}

export default Router;