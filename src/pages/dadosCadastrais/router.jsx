import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MeusDados from './meusDados';

import AlterarSenha from './alterarSenha';

function Router(){
    return(
        <Switch>
            <Route exact path='/dados-cadastrais/meus-dados' component={ props => <MeusDados {...props} />} />
            <Route exact path='/dados-cadastrais/alterar-senha' component={ props => <AlterarSenha {...props} />} />
        </Switch>
    )
}

export default Router;