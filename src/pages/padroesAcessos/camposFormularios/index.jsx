import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarCamposFormularios } from './actions';

class Index extends Component{

    componentDidMount(){
        this.props.buscarCamposFormularios()
    }

    render(){

        const { loading, camposFormularios} = this.props.padroesAcessos

        let dataCamposFormularios = []

        if(camposFormularios.response){
            dataCamposFormularios = camposFormularios.response.content.map(row => ({
                id: row.id,
                nome: row.label,
                descricao: row.descricao,
                link: '/padroes-acessos/campos-formularios/' + row.id + '/visualizar'
            }))
        }

        const columns = [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Nome Ticket',
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
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
                                <i className={`fa fa-eye`}></i>
                            </Link>,
            }   
        ];

        return(
            <section className="content">
                <MenuHeader title={`Campos de formulários`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataCamposFormularios} 
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
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarCamposFormularios }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
