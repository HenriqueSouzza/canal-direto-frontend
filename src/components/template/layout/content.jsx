import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Dashboard from '../../../pages/dashboard/router';

import DadosCadastrais from '../../../pages/dadosCadastrais/router';

import Sair from '../../../pages/sair/router';

import PaginaNaoEncontrada from '../../../pages/errosPagina/paginaNaoEncontrada';
 
import Setor from '../../../pages/setor/router';

function Content(){
    return(
        <div className="content-wrapper">
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/dados-cadastrais' component={DadosCadastrais} />
                <Route path='/setor' component={Setor} />
                <Route path='/sair' component={Sair} />
                <Route path="*" component={PaginaNaoEncontrada}/>
            </Switch>
        </div>
    )
}

export default Content;