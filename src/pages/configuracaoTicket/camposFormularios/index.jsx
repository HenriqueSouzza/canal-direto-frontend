import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarStatusTicket } from '../statusTicket/actions';

class Index extends Component{

    componentDidMount(){
        this.props.buscarStatusTicket()
    }

    render(){

        const { loading, camposFormularios} = this.props.configuracaoTicket

        const dataCamposFormularios = []

        if(camposFormularios.response){
            camposFormularios.response.content.map(row => {
                dataCamposFormularios.push({
                    id: row.id,
                    nome: row.nome,
                    descricao: row.descricao,
                    link: '/configuracao-ticket/campos-formularios/' + row.id + '/visualizar'
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
const mapStateToProps = state => ({ configuracaoTicket: state.configuracaoTicket })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
