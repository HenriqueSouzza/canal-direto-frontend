import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Link de Alunos
import Alunos from './alunos/alunos';
import AlunosNovo from './alunos/novo';
import AlunosEditar from './alunos/editar';

//Link Atividades ativas
import AtividadesAtivas from  './atividades-ativas/atividades';
import AtividadesAtivasVisualizar from  './atividades-ativas/visualizar';

//Link Atividades
import Atividades from './atividades/atividades';
import AtividadesNovo from './atividades/novo';
import AtividadesEditar from './atividades/editar';

//Link Grupo atividades
import GrupoAtividades from './grupo-atividades/grupoAtividades';
import GrupoAtividadesNovo from './grupo-atividades/novo';
import GrupoAtividadesEditar from './grupo-atividades/editar';

//Link Sub-atividades
import SubAtividades from './sub-atividades/subAtividades';
import SubAtividadesNovo from './sub-atividades/novo';
import SubAtividadesEditar from './sub-atividades/editar';


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
            {/*  */}
            <Route exact path='/atividades-complementares/atividades-ativas' component={ props => <AtividadesAtivas {...props} />} />
            <Route exact path='/atividades-complementares/atividades-ativas/:atividade/visualizar' component={ props => <AtividadesAtivasVisualizar {...props} />} />
            {/*  */}
            <Route exact path='/atividades-complementares/atividades' component={ props => <Atividades {...props} />} />
            <Route exact path='/atividades-complementares/atividades/novo' component={ props => <AtividadesNovo {...props} />} />
            <Route exact path='/atividades-complementares/atividades/:atividade/editar' component={ props => <AtividadesEditar {...props} />} />
            {/*  */}
            <Route exact path='/atividades-complementares/grupo-atividades' component={ props => <GrupoAtividades {...props} />} />
            <Route exact path='/atividades-complementares/grupo-atividades/novo' component={ props => <GrupoAtividadesNovo {...props} />} />
            <Route exact path='/atividades-complementares/grupo-atividades/:grupo/editar' component={ props => <GrupoAtividadesEditar {...props} />} />
            {/*  */}
            <Route exact path='/atividades-complementares/sub-atividades' component={ props => <SubAtividades {...props} />} />
            <Route exact path='/atividades-complementares/sub-atividades/novo' component={ props => <SubAtividadesNovo {...props} />} />
            <Route exact path='/atividades-complementares/sub-atividades/:subatividade/editar' component={ props => <SubAtividadesEditar {...props} />} />
        </Switch>
    )
}

export default Router;