import React from 'react';

import MenuLink from '../../menu/menuLink';

import MenuTreeView from '../../menu/menuTreeView';

function Menu(){

    return(
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                {/* <MenuLink description={`Dashboard`} path={`/`} icon={`fas fa-tachometer-alt`}  active={``} /> */}
                <MenuTreeView description={`Dados cadastrais`} path={`#`} icon={`fas fa-user`} >
                    <MenuLink description={`Meus dados`} path={`/dados-cadastrais/meus-dados`} icon={`fa fa-user-edit`} active={``} />
                    <MenuLink description={`Alterar Senha`} path={`/dados-cadastrais/alterar-senha`} icon={`fa fa-key`} active={``} />
                </MenuTreeView>
                <MenuTreeView description={`AcampUnidos`} path={`#`} icon={`fas fa-tasks`} >
                    <MenuLink description={`Informações`} path={`/acamp-unidos/informacoes`} icon={`fa fa-users`} active={``} />
                    <MenuLink description={`Inscrever`} path={`/acamp-unidos/inscrever`} icon={`fa fa-users`} active={``} />
                </MenuTreeView>
                <MenuLink description={`Sair`} path={`/sair`} icon={`fa fa-sign-out-alt`} active={``} />
            </ul>
        </nav>
    )
}

export default Menu;