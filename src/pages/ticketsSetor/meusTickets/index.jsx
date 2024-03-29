import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import Input from '../../../components/form/input';

import Select from '../../../components/form/select';

import Button from '../../../components/form/button';

import { composeValidators, FORM_RULES } from '../../../helpers/validations';

import { buscarMeusTickets, buscarStatusTicket } from './actions';

import moment from 'moment';
 

class Index extends Component{

    componentDidMount(){
        this.props.buscarMeusTickets('?where[usuario_atendente]=' + this.props.auth.user.email + "&where[status]=2")
        this.props.buscarStatusTicket()
    }

    onSubmit = values => {
        let where = '?where[usuario_atendente]=' + this.props.auth.user.email

        if(values.status){
            where += "&where[status]=" + values.status
        }
        
        if(values.ticket){
            where += "&where[id]=" + values.ticket
        }

        if(values.assunto){
            where += "&like=assunto," + values.assunto
        }

        if(values.dt_ini && values.dt_fim){
            where += "&whereBetween[dt_criacao]=" + String(values.dt_ini) + ',' + String(values.dt_fim) 
        }

        this.props.buscarMeusTickets(where)
    }

    render(){

        const { loading, meusTickets, statusTicket } = this.props.ticketsSetor
        
        const dataStatusTicket = [];

        if(statusTicket.response){
            statusTicket.response.content.map(row => {
                if(row.id != 1){
                    dataStatusTicket.push({
                        id: row.id,
                        name: row.nome 
                    })
                }
            })
        }

        let dataTicket = []

        if(meusTickets.response){
            dataTicket = meusTickets.response.content.map(row => ({
                ticket: row.id,
                assunto: row.assunto,
                setor: row.setor,
                indicador:  row.status.ordem == 4 || row.status.ordem == 5 ? 
                                'text-success'
                            : 
                                row.dt_interacao ? 
                                    moment().subtract(3, "days") >= moment(row.dt_interacao) ? 'text-danger'
                                    : moment().subtract(2, "days") >= moment(row.dt_interacao) ? 'text-orange'
                                    : moment().subtract(1, "days") >= moment(row.dt_interacao) ? 'text-yellow'
                                    : 'text-success'
                                :
                                    moment().subtract(3, "days") >= moment(row.dt_criacao) ? 'text-danger'
                                    : moment().subtract(2, "days") >= moment(row.dt_criacao) ? 'text-orange'
                                    : moment().subtract(1, "days") >= moment(row.dt_criacao) ? 'text-yellow'
                                    : 'text-success',
                categoria: row.categoria,
                status: row.status.ordem,
                criado: moment(row.dt_criacao).calendar(),
                atualizacao: row.dt_interacao ? moment(row.dt_interacao).calendar() : moment(row.dt_criacao).calendar(),
                // criado: moment(row.dt_criacao).format('DD-MM-YYYY H:mm'),
                link: '/tickets-setor/meus-tickets/' + row.id + '/visualizar',
                quantidadeTicketUsuario: row.quantidade_ticket_usuario
            }))
        }

        const columns = [
            {
                name: 'Indicador',
                button: true,
                cell: row => <div className={`nav-link ${row.indicador}`}>
                                <i className={`fa fa-circle`}></i>
                            </div>
            }, 
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

        const initialValues = {
            status: 2
        } 
        
        return(
            <section className="content">
                <MenuHeader title={`Meus Tickets em Atendimentos`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-header">
                            <h3 className="card-title">Filtros</h3>
                        </div>
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                initialValues={initialValues}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`number`}
                                                    name={`ticket`} 
                                                    label={`Nº Ticket:`}
                                                    icon={``}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    validate={composeValidators(FORM_RULES.number)}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`assunto`} 
                                                    label={`Assunto:`}
                                                    icon={``}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`dt_ini`} 
                                                    label={`Data inicial:`}
                                                    icon={``}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`dt_fim`} 
                                                    label={`Data final:`}
                                                    icon={``}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Select} 
                                                    name={`status`} 
                                                    data={dataStatusTicket}
                                                    label={`Status:`}
                                                    />
                                            </div>
                                            <div className="col-md-3 offset-6">
                                                <label>&nbsp;</label>
                                                <Field 
                                                    component={Button} 
                                                    type={`submit`}
                                                    name={`sendFilter`}
                                                    color={`btn-success`} 
                                                    description={`Filtrar`}
                                                    icon={`fa fa-search`}
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
                            <div className="row">
                                {/* {dataStatusTicket.length > 0 ?
                                    dataStatusTicket.map((row,index) => (
                                        <div className="col-md" key={index}>
                                            {dataTicket.length > 0 ? 
                                                dataTicket[0].quantidadeTicketUsuario.map(val => (
                                                    val.ordem == row.id ?
                                                        <h5 className={parseInt(dataTicket[0].status) == row.id ? `text-primary` : ``}>
                                                            ({val.quantidade.map(qtd => qtd.usuario == this.props.auth.user.email ? qtd.count : 0 )}) 
                                                            &nbsp; {val.nome}
                                                        </h5>
                                                    : ''
                                                ))
                                            : 
                                                <h5>
                                                    (0) &nbsp; {row.name}
                                                </h5>
                                            }
                                        </div>
                                    ))
                                : ''} */}
                                {dataTicket.length > 0 ? 
                                    dataTicket[0].quantidadeTicketUsuario.map((row,index) => (
                                        <div className="col-md" key={index}>
                                            <h5 className={parseInt(dataTicket[0].status) == row.ordem ? `text-primary` : ``}>
                                                ({row.quantidade.map(val => {
                                                    if(this.props.auth.user.email == val.usuario){
                                                        return (val.count)
                                                    }
                                                })}) {row.nome}
                                            </h5>
                                        </div>
                                    ))
                                : ''}
                            </div>
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataTicket} 
                                router={this.props.history}
                                actions={null}
                                loading={loading || !meusTickets.response} 
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
const mapStateToProps = state => ({ ticketsSetor: state.ticketsSetor, auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets, buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);