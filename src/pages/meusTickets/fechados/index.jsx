import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import { FORM_RULES } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import { buscarMeusTickets } from '../actions';

import moment from 'moment';
 

class Index extends Component{

    componentDidMount(){
        this.props.buscarMeusTickets('&where[fechado]=1')
    }

    onSubmit = values => {
        let $where = '&where[fechado]=1'

        if(values.ticket) {
            $where += '&where[id]='+ values.ticket
        }

        if(values.assunto) {
            $where += '&like=assunto,'+ values.assunto
        }

        if(values.dt_fechamento){
            $where += "&whereDate[dt_fechamento]=" + values.dt_fechamento
        }

        this.props.buscarMeusTickets($where)
    }

    render(){

        const { loading, meusTickets } = this.props.meusTickets
        
        const dataTicket = []
        
        if(meusTickets.response){
            meusTickets.response.content.map(row => {
                dataTicket.push({
                    ticket: row.id,
                    assunto: row.assunto,
                    setor: row.setor,
                    categoria: row.categoria,
                    fechado: moment(row.dt_fechamento).calendar(),
                    // fechado: moment(row.created_at).format('DD-MM-YYYY H:mm'),
                    link: '/meus-tickets/fechados/' + row.id + '/visualizar'
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
                name: 'Fechado em',
                selector: 'fechado',
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
                <MenuHeader title={`Meus Tickets Fechados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-header">
                            <h3 className="card-title">Filtros</h3>
                        </div>
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`number`}
                                                    name={`ticket`} 
                                                    label={`Nº Ticket:`}
                                                    icon={false}
                                                    placeholder={`Número do Ticket`}
                                                    validate={FORM_RULES.number}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`assunto`} 
                                                    label={`Assunto:`}
                                                    icon={`fa fa-comment`}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`dt_fechamento`} 
                                                    label={`Data de Fechamento:`}
                                                    icon={false}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-4 text-center">
                                                <Field 
                                                    component={Button} 
                                                    type={`submit`}
                                                    name={`sendFilter`}
                                                    color={`btn-success`} 
                                                    description={`Filtrar`}
                                                    icon={`fa fa-filter`}
                                                    disabled={loading}
                                                    />
                                            </div>
                                        </div>
                                    </form>
                                )}/>
                        </div>
                    </div>
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
const mapStateToProps = state => ({ meusTickets: state.meusTickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);