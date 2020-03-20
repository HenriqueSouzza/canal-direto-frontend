import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Link de Alunos
import Alunos from './alunos/alunos';
import AlunosNovo from './alunos/novo';
import AlunosEditar from './alunos/editar';

function Router(props){

    return(
        <Switch>
            {/*  */}
            <Route exact path='/' component={ props => <Alunos {...props} />} />
            <Route exact path='/inscricoes/alunos' component={ props => <Alunos {...props} />} />
            <Route exact path='/inscricoes/alunos/novo' component={ props => <AlunosNovo {...props} />} />
            <Route exact path='/inscricoes/alunos/:ordem/editar' component={ props => <AlunosEditar {...props} />} />
        </Switch>
    )

}

export default Router;