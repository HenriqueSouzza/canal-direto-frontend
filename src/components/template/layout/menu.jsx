import React from 'react';

import MenuLink from '../../menu/menuLink';

import MenuTreeView from '../../menu/menuTreeView';

function Menu(){
    return(
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* <MenuLink description={`Dashboard`} path={`/`} icon={`fas fa-tachometer-alt`}  active={``} /> */}
                <MenuTreeView description={`Atividades Compl.`} path={`#`} icon={`fas fa-tasks`} >
                    <MenuLink description={`Alunos`} path={`/atividades-complementares/alunos`} icon={`fa fa-users`} active={``} />
                    <MenuLink description={`Atividades Ativas`} path={`/atividades-complementares/atividades-ativas`} icon={`fa fa-toggle-on`} active={``}/>
                    <MenuLink description={`Grupo Atividades`} path={`/atividades-complementares/grupo-atividades`} icon={`fas fa-object-group`} active={``}/>
                    <MenuLink description={`Atividades`} path={`/atividades-complementares/atividades`} icon={`fa fa-list-alt`} active={``}/>
                    <MenuLink description={`Sub-atividades`} path={`/atividades-complementares/sub-atividades`} icon={`fas fa-th-large`} active={``}/>
                </MenuTreeView>
            </ul>
        </nav>
    )
}

export default Menu;