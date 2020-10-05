import React from 'react';

import { Route, Switch } from 'react-router-dom';

import PaginaNaoEncontrada from '../errosPagina/paginaNaoEncontrada';

import Papeis from './papeis/index';
import PapeisVisualizar from './papeis/visualizar';
import PapeisNovo from './papeis/novo';

import Permissoes from './permissoes/index';

import Setor from './setor';
import SetorVisualizar from './setor/visualizar';
import SetorNovo from './setor/novo';

import CategoriaVisualizar from './categoria/visualizar';
import CategoriaNovo from './categoria/novo';

import Formularios from './formularios/index';
import FormulariosNovo from './formularios/novo';
import FormulariosVisualizar from './formularios/visualizar';

import CamposFormularios from './camposFormularios/index';
import CamposFormulariosNovo from './camposFormularios/novo';
import CamposFormulariosVisualizar from './camposFormularios/visualizar';

import StatusTicket from './statusTicket/index';
import StatusTicketNovo from './statusTicket/novo';
import StatusTicketVisualizar from './statusTicket/visualizar';

import Usuarios from './usuarios/index';
import UsuariosVisualizar from './usuarios/visualizar';

import Menu from './menus/index';
import MenuNovo from './menus/novo';
import MenuVisualizar from './menus/visualizar';

import SubMenuNovo from './submenu/novo';
import SubMenuVisualizar from './submenu/visualizar';

function Router(){
    
    return(
        <Switch>

            <Route exact path='/padroes-acessos/papeis' component={ props => <Papeis {...props} />} />
            <Route exact path='/padroes-acessos/papeis/:id/visualizar' component={ props => <PapeisVisualizar {...props} />} />
            <Route exact path='/padroes-acessos/papeis/novo' component={ props => <PapeisNovo {...props} />} />

            <Route exact path='/padroes-acessos/permissoes' component={ props => <Permissoes {...props} />} />

            <Route exact path='/padroes-acessos/setor' component={ props => <Setor {...props} />} />
            <Route exact path='/padroes-acessos/setor/:id/visualizar' component={ props => <SetorVisualizar {...props} />} />
            <Route exact path='/padroes-acessos/setor/novo' component={ props => <SetorNovo {...props} />} />

            <Route exact path='/padroes-acessos/categoria/:id/visualizar' component={ props => <CategoriaVisualizar {...props} />} />
            <Route exact path='/padroes-acessos/categoria/:id/novo' component={ props => <CategoriaNovo {...props} />} />

            <Route exact path='/padroes-acessos/formularios' component={ props => <Formularios {...props} />} />
            <Route exact path='/padroes-acessos/formularios/novo' component={ props => <FormulariosNovo {...props} />} />
            <Route exact path='/padroes-acessos/formularios/:id/visualizar' component={ props => <FormulariosVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/campos-formularios' component={ props => <CamposFormularios {...props} />} />
            <Route exact path='/padroes-acessos/campos-formularios/novo' component={ props => <CamposFormulariosNovo {...props} />} />
            <Route exact path='/padroes-acessos/campos-formularios/:id/visualizar' component={ props => <CamposFormulariosVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/status-ticket' component={ props => <StatusTicket {...props} />} />
            <Route exact path='/padroes-acessos/status-ticket/novo' component={ props => <StatusTicketNovo {...props} />} />
            <Route exact path='/padroes-acessos/status-ticket/:id/visualizar' component={ props => <StatusTicketVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/usuarios' component={ props => <Usuarios {...props} />} />
            <Route exact path='/padroes-acessos/usuarios/:id/visualizar' component={ props => <UsuariosVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/menus' component={ props => <Menu {...props} />} />
            <Route exact path='/padroes-acessos/menus/novo' component={ props => <MenuNovo {...props} />} />
            <Route exact path='/padroes-acessos/menus/:id/visualizar' component={ props => <MenuVisualizar {...props} />} />

            <Route exact path='/padroes-acessos/submenu/:id/novo' component={ props => <SubMenuNovo {...props} />} />
            <Route exact path='/padroes-acessos/submenu/:id/visualizar' component={ props => <SubMenuVisualizar {...props} />} />

            <Route path="*" component={PaginaNaoEncontrada}/>
        </Switch>
    )
    
}

export default Router;