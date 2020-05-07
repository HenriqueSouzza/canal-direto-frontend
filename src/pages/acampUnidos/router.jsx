import React from 'react';

import { Route, Switch } from 'react-router-dom';

//Link de Alunos
import Informacoes from './informacoes/informacoes';
import Inscrever  from './inscrever/inscrever';  
// import Alunos from './alunos/alunos';
// import AlunosNovo from './alunos/novo';
// import AlunosEditar from './alunos/editar';

function Router(props){

    return(
        <Switch>
            {/*  */}
            <Route exact path='/acamp-unidos' component={ props => <Informacoes {...props} />} />
            <Route exact path='/acamp-unidos/informacoes' component={ props => <Informacoes {...props} />} />
            <Route exact path='/acamp-unidos/inscrever' component={ props => <Inscrever {...props} />} />
            {/* <Route exact path='/inscricoes/alunos/novo' component={ props => <AlunosNovo {...props} />} />
            <Route exact path='/inscricoes/alunos/:ordem/editar' component={ props => <AlunosEditar {...props} />} /> */}
        </Switch>
    )

}

export default Router;