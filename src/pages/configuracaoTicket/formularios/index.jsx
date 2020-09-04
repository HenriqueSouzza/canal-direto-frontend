import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarFormularios } from '../formularios/actions';

class Index extends Component{

    componentDidMount(){
        this.props.buscarFormularios()
    }

    render(){

        const { loading, formularios} = this.props.configuracaoTicket

        const dataFormularios = []

        if(formularios.response){
            formularios.response.content.map(row => {
                dataFormularios.push({
                    id: row.id,
                    nome: row.nome,
                    descricao: row.descricao,
                    link: '/configuracao-ticket/formularios/' + row.id + '/visualizar'
                })
            })
        }

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
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
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
const mapStateToProps = state => ({ configuracaoTicket: state.configuracaoTicket })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarFormularios }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
