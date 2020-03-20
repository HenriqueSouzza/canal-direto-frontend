import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Link de Alunos
import Alunos from './alunos/alunos';
import AlunosNovo from './alunos/novo';
import AlunosEditar from './alunos/editar';

function Router(props){

    /**
     * If temporário, porque o menu dashboard está desativado,
     * É necessário para forçar a aba alunos inscritos como página inicial
     */
    if(props.history.location.pathname === '/'){
        props.history.push('atividades-complementares/alunos')
    }

    return(
        <Switch>
            {/*  */}
            <Route exact path='/' component={ props => <Alunos {...props} />} />
            <Route exact path='/atividades-complementares/alunos' component={ props => <Alunos {...props} />} />
            <Route exact path='/atividades-complementares/alunos/novo' component={ props => <AlunosNovo {...props} />} />
            <Route exact path='/atividades-complementares/alunos/:ordem/editar' component={ props => <AlunosEditar {...props} />} />
        </Switch>
    )
}

export default Router;