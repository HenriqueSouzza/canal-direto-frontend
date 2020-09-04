import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

class Index extends Component{

    render(){

        const loading = false

        const dataFormularios = [
            {id: '1', nome: '', descricao: ''}
        ]

        const columns = [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Nome do formulário',
                selector: 'nome',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'descricao',
                sortable: true,
            },
            {
                name: 'Detalhe',
                button: true,
                cell: row => <Link to={`/configuracao-ticket/formularios/${row.id}/visualizar`} className={`nav-link text-info`}>
                                <i className={`fa fa-eye`}></i>
                            </Link>,
            }   
        ];

        return(
            <section className="content">
                <MenuHeader title={`Formulários de Tickets`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataFormularios} 
                                router={this.props.history}
                                actions={null}
                                loading={loading}
                                btnAdd 
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
const mapStateToProps = state => ({ })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
