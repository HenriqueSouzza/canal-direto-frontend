import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import  { buscarMenus } from './actions';


class Index extends Component{

    componentDidMount(){
        this.props.buscarMenus()
    }

    render(){

        const { loading, menus } = this.props.padroesAcessos
        
        let dataMenus = []

        if(menus.response){
            dataMenus = menus.response.content.map(row => ({
                menu: row.id, 
                nome: row.nome, 
                link: row.link,
                link: '/padroes-acessos/menus/' + row.id + '/visualizar'
            }))
        }

        const columns = [
            {
                name: '#',
                selector: 'menu',
                sortable: true,
            },
            {
                name: 'Nome',
                selector: 'nome',
                sortable: true,
            },            
            {
                name: 'Link',
                selector: 'link',
                sortable: true,
            },
            {
                name: 'Detalhe',
                button: true,
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
                                <i className={`fa fa-eye`}></i>
                            </Link>,
            } 
        ];        

        return(
            <section className="content">
                <MenuHeader title={`Menus cadastrados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                         <div className="card-body">
                            <DataTable
                                columns={columns} 
                                data={dataMenus} 
                                router={this.props.history}
                                btnAdd
                                loading={loading} 
                            />
                        </div>
                    </div>
                </div>
            </section>
        )

    }

}


/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMenus }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
