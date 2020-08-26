import React from 'react';

import MenuLink from '../../components/menu/menuLink';

import MenuTreeView from '../../components/menu/menuTreeView';

function Menu(){

    return(
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                {/* <MenuLink description={`Dashboard`} path={`/`} icon={`fas fa-tachometer-alt`}  active={``} /> */}
                {/* <MenuTreeView description={`Dados cadastrais`} path={`#`} icon={`fas fa-user`} >
                    <MenuLink description={`Meus dados`} path={`/dados-cadastrais/meus-dados`} icon={`fa fa-user-edit`} active={``} />
                    <MenuLink description={`Alterar Senha`} path={`/dados-cadastrais/alterar-senha`} icon={`fa fa-key`} active={``} />
                </MenuTreeView> */}
                <MenuTreeView description={`Meus ticket`} path={`#`} icon={`fa fa-address-card`} >
                    <MenuLink description={`Novo Ticket`} path={`/meus-tickets/novo-ticket`} icon={`fa fa-edit`} active={``} />
                    <MenuLink description={`Abertos`} path={`/meus-tickets/abertos`} icon={`fa fa-envelope-open`} active={``} />
                    <MenuLink description={`Fechados`} path={`/meus-tickets/fechados`} icon={`fa fa-envelope`} active={``} />
                </MenuTreeView>
                <MenuTreeView description={`Tickets meu setor`} path={`#`} icon={`fa fa-building`} >
                    <MenuLink description={`Para meu setor`} path={`/tickets-setor/para-meu-setor`} icon={`fa fa-object-group`} active={``} />
                    <MenuLink description={`Meus tickets`} path={`/tickets-setor/meus-tickets`} icon={`fa fa-address-book`} active={``} />
                </MenuTreeView>
                {/* <MenuTreeView description={`Gerenciar tickets`} path={`#`} icon={`fa fa-clone`} >
                    <MenuLink description={`Do meu setor`} path={`/tickets/meus-tickets`} icon={`fa fa-unlock`} active={``} />
                    <MenuLink description={`Para meu setor`} path={`/tickets/meus-tickets`} icon={`fa fa-unlock`} active={``} />
                </MenuTreeView> */}
                <MenuLink description={`Setor`} path={`/setor`} icon={`fa fa-sitemap`} active={``} />
                <MenuLink description={`Sair`} path={`/sair`} icon={`fa fa-sign-out-alt`} active={``} />
            </ul>
        </nav>
    )
}

export default Menu;