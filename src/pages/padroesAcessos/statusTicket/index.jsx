import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarStatusTicket } from './actions';

class Index extends Component{

    componentDidMount(){
        this.props.buscarStatusTicket()
    }

    render(){

        const { loading, statusTicket} = this.props.padroesAcessos

        let dataStatusTicket = []

        if(statusTicket.response){
            dataStatusTicket = statusTicket.response.content.map(row => ({
                ordem: row.ordem,
                nome: row.nome,
                // descricao: row.descricao,
                link: '/padroes-acessos/status-ticket/' + row.id + '/visualizar'
            }))
        }

        const columns = [
            {
                name: 'Ordem',
                selector: 'ordem',
                sortable: true,
            },
            {
                name: 'Nome Ticket',
                selector: 'nome',
                sortable: true,
            },
            // {
            //     name: 'Descrição',
            //     selector: 'descricao',
            //     sortable: true,
            // },
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
                <MenuHeader title={`Status de ticket`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataStatusTicket} 
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
