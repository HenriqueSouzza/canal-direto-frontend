import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarMeusTickets } from '../actions';

import moment from 'moment';
 

class Index extends Component{

    componentDidMount(){
        this.props.buscarMeusTickets()
    }

    render(){

        const { loading, meusTickets } = this.props.ticketsSetor
        
        const dataTicket = []
        
        if(meusTickets.response){
            meusTickets.response.content.map(row => {
                dataTicket.push({
                    ticket: row.id,
                    assunto: row.assunto,
                    setor: row.setor,
                    categoria: row.categoria,
                    criado: moment(row.created_at).calendar(),
                    atualizacao: row.dt_interacao ? moment(row.dt_interacao).calendar() : moment(row.created_at).calendar(),
                    // criado: moment(row.created_at).format('DD-MM-YYYY H:mm'),
                    link: '/tickets-setor/meus-tickets/' + row.id + '/visualizar'
                })
            })
        }

        const columns = [
            {
                name: 'Ticket',
                selector: 'ticket',
                sortable: true,
            },
            {
                name: 'Assunto',
                selector: 'assunto',
                sortable: true,
            },
            {
                name: 'Setor',
                selector: 'setor',
                sortable: true,
            },
            {
                name: 'Categoria',
                selector: 'categoria',
                sortable: true,
            },
            {
                name: 'Criado em',
                selector: 'criado',
                sortable: true,
            },
            {
                name: 'Atualização',
                selector: 'atualizacao',
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
                <MenuHeader title={`Meus Tickets em Atendimentos`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataTicket} 
                                router={this.props.history}
                                actions={null}
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
const mapStateToProps = state => ({ ticketsSetor: state.ticketsSetor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);