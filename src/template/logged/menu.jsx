import React from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import MenuLink from '../../components/menu/menuLink';

import MenuTreeView from '../../components/menu/menuTreeView';

import { efetuarLogout } from '../../pages/auth/actions';

function Menu(props){

    const onLogout = () => {
        props.efetuarLogout()
    }

    return(
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                {/* <MenuLink description={`Dashboard`} path={`/`} icon={`fas fa-tachometer-alt`}  active={``} /> */}
                <MenuTreeView description={`Meus ticket`} path={`#`} icon={`fa fa-address-card`} >
                    <MenuLink description={`Novo Ticket`} path={`/meus-tickets/novo`} icon={`fa fa-edit`} active={``} />
                    <MenuLink description={`Abertos`} path={`/meus-tickets/abertos`} icon={`fa fa-envelope-open`} active={``} />
                    <MenuLink description={`Fechados`} path={`/meus-tickets/fechados`} icon={`fa fa-envelope`} active={``} />
                </MenuTreeView>
                <MenuTreeView description={`Tickets meu setor`} path={`#`} icon={`fa fa-building`} >
                    <MenuLink description={`Para meu setor`} path={`/tickets-setor/para-meu-setor`} icon={`fa fa-object-group`} active={``} />
                    <MenuLink description={`Meus tickets`} path={`/tickets-setor/meus-tickets`} icon={`fa fa-address-book`} active={``} />
                </MenuTreeView>
                <MenuTreeView description={`Padrões de acessos`} path={`#`} icon={`fa fa-cogs`} >
                    <MenuLink description={`Papéis`} path={`/padroes-acessos/papeis`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Permissões`} path={`/padroes-acessos/permissoes`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Setor`} path={`/padroes-acessos/setor`} icon={`fa fa-sitemap`} active={``} />
                    <MenuLink description={`Status Ticket`} path={`/padroes-acessos/status-ticket`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Formulários`} path={`/padroes-acessos/formularios`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Campos Formulários`} path={`/padroes-acessos/campos-formularios`} icon={`fa fa-list-ul`} active={``} />
                </MenuTreeView>
                <MenuLink description={`Usuários`} path={``} icon={`fa fa-users`} active={``} />
                <MenuLink onClick={() => onLogout()} description={`Sair`} path={``} icon={`fa fa-sign-out-alt`} active={``} />
            </ul>
        </nav>
    )
}


/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ efetuarLogout }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Menu);