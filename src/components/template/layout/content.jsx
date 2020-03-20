import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Dashboard from '../../../pages/dashboard/router';

import Inscricoes from '../../../pages/inscricoes/router';

function Content(){
    return(
        <div className="content-wrapper">
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/inscricoes' component={Inscricoes} />
            </Switch>
        </div>
    )
}

export default Content;