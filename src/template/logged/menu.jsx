import React from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import MenuLink from '../../components/menu/menuLink';

import MenuTreeView from '../../components/menu/menuTreeView';

import { efetuarLogout } from '../../pages/auth/actions';

import LoadingBody from '../../components/loading/loadingBody';

function Menu(props){

    const onLogout = () => {
        props.efetuarLogout()
    }

    let menu = []

    if(props.auth.papel.length > 0 && props.auth.papel[0].menus.length > 0){
        menu = props.auth.papel[0].menus
    }else if(props.auth.user.papeis.length > 0){
        menu = props.auth.user.papeis[0].menus
    }

    return(
        <nav className="mt-2">
            <LoadingBody status={props.auth.loading} />
            <ul className="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
                {/* <MenuLink description={`Dashboard`} path={`/`} icon={`fas fa-tachometer-alt`}  active={``} /> */}
                {
                    menu.length > 0 ?  
                        menu.map( (row,index) => (
                            <MenuTreeView key={index} description={row.nome} path={row.link} icon={row.icon}>
                                    {
                                        row.submenus.length > 0 ? 
                                            row.submenus.map((val,i) => (
                                                parseInt(val.ativo) ? 
                                                    <MenuLink key={i} description={val.nome} path={val.link_submenu} icon={val.icon} active={``} />
                                                : ''
                                            ))
                                        :   
                                            '' 
                                    }
                            </MenuTreeView>        
                        ))                
                    :
                        ''
                }
                {/* <MenuTreeView description={`Meus ticket`} path={`#`} icon={`fa fa-address-card`} >
                    <MenuLink description={`Novo Ticket`} path={`/meus-tickets/novo`} icon={`fa fa-edit`} active={``} />
                    <MenuLink description={`Abertos`} path={`/meus-tickets/abertos`} icon={`fa fa-envelope-open`} active={``} />
                    <MenuLink description={`Fechados`} path={`/meus-tickets/fechados`} icon={`fa fa-envelope`} active={``} />
                </MenuTreeView> */}
                {/* <MenuTreeView description={`Tickets meu setor`} path={`#`} icon={`fa fa-building`} >
                    <MenuLink description={`Para meu setor`} path={`/tickets-setor/para-meu-setor`} icon={`fa fa-object-group`} active={``} />
                    <MenuLink description={`Meus tickets`} path={`/tickets-setor/meus-tickets`} icon={`fa fa-address-book`} active={``} />
                </MenuTreeView> */}
                {/* <MenuTreeView description={`Padrões de acessos`} path={`#`} icon={`fa fa-cogs`} >
                    <MenuLink description={`Usuários`} path={`/padroes-acessos/usuarios`} icon={`fa fa-users`} active={``} />
                    <MenuLink description={`Papéis`} path={`/padroes-acessos/papeis`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Permissões`} path={`/padroes-acessos/permissoes`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Setor`} path={`/padroes-acessos/setor`} icon={`fa fa-sitemap`} active={``} />
                    <MenuLink description={`Status Ticket`} path={`/padroes-acessos/status-ticket`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Formulários`} path={`/padroes-acessos/formularios`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Campos Formulários`} path={`/padroes-acessos/campos-formularios`} icon={`fa fa-list-ul`} active={``} />
                    <MenuLink description={`Menu`} path={`/padroes-acessos/menus`} icon={`fa fa-list-ul`} active={``} />
                </MenuTreeView> */}
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