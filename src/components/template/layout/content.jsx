import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Dashboard from '../../../pages/dashboard/router';

import DadosCadastrais from '../../../pages/dadosCadastrais/router';

import AcampUnidos from '../../../pages/acampUnidos/router';

import Sair from '../../../pages/sair/router';

function Content(){
    return(
        <div className="content-wrapper">
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/dados-cadastrais' component={DadosCadastrais} />
                <Route path='/acamp-unidos' component={AcampUnidos} />
                <Route path='/sair' component={Sair} />
            </Switch>
        </div>
    )
}

export default Content;