import React from 'react';

import { Route, Router  } from 'react-router-dom';

import { createHashHistory } from 'history';

import Dashboard from '../../../pages/dashboard/router';

import AtividadesComplementares from '../../../pages/atividadesComplementares/router';

/*** ***/
export const history = createHashHistory();

function Content(){
    return(
        <div className="content-wrapper">
            <Router history={history}>
                <Route exact path='/' component={AtividadesComplementares} />
                {/* <Route exact path='/' component={Dashboard} /> */}
                <Route path='/atividades-complementares' component={AtividadesComplementares} />
            </Router>
        </div>
    )
}

export default Content;