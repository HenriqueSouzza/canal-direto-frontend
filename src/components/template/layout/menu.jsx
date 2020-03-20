import React from 'react';

import MenuLink from '../../menu/menuLink';

import MenuTreeView from '../../menu/menuTreeView';

function Menu(){
    return(
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <MenuLink description={`Dashboard`} path={`/`} icon={`fas fa-tachometer-alt`}  active={``} />
                <MenuTreeView description={`Inscrições.`} path={`#`} icon={`fas fa-tasks`} >
                    <MenuLink description={`Inscritos`} path={`/inscricoes/alunos`} icon={`fa fa-users`} active={``} />
                </MenuTreeView>
            </ul>
        </nav>
    )
}

export default Menu;