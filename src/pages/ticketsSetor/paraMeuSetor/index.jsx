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

import { buscarTicketsSetor, buscarStatusTicket } from './actions';

import moment from 'moment';

class Index extends Component{

    componentDidMount(){
        this.props.buscarStatusTicket()

        let setor = []
        
        this.props.auth.user.categoriaAtendente.map(row => setor.push(row.setor.map(val => val.id)))

        let whereIn = "?where[status]=1"

        if(setor.length > 0){
            whereIn += '&whereIn[setor]=' + setor.toString()
        }

        this.props.buscarTicketsSetor(whereIn)
    }

    onSubmit = values => {
        let where = ''

        if(values.status){
            where += "?where[status]=" + values.status
        }

        if(values.dt_ini && values.dt_fim){
            where += values.status ? "&whereBetween[dt_criacao]=" + String(values.dt_ini) + ',' + String(values.dt_fim) 
                                    : "?whereBetween[dt_criacao]=" + String(values.dt_ini) + ',' + String(values.dt_fim) 
        }

        this.props.buscarTicketsSetor(where)
    }

    render(){

        const { loading, meuSetor, statusTicket } = this.props.ticketsSetor

        const dataStatusTicket = [];

        if(statusTicket.response){
            statusTicket.response.content.map(row => {
                dataStatusTicket.push({
                   id: row.id,
                   name: row.nome 
                })
            })
        }

        let dataTicket = []
        
        if(meuSetor.response){
            dataTicket = meuSetor.response.content.map(row => ({
                ticket: row.id,
                assunto: row.assunto,
                setor: row.setor,
                categoria: row.categoria,
                status: row.status.ordem,
                criado: moment(row.dt_criacao).calendar(),
                atualizacao: row.dt_interacao ? moment(row.dt_interacao).calendar() : moment(row.dt_criacao).calendar(),
                // criado: moment(row.dt_criacao).format('DD-MM-YYYY H:mm'),
                link: '/tickets-setor/para-meu-setor/' + row.id + '/visualizar'
            }))
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
                            </Link>
            }   
        ];

        const initialValues = {
            status: '1'
        }

        return(
            <section className="content">
                <MenuHeader title={`Tickets Para o Meu Setor`} history={this.props.location.pathname} />
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
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`dt_ini`} 
                                                    label={`Data inicial:`}
                                                    icon={``}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`dt_fim`} 
                                                    label={`Data final:`}
                                                    icon={``}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`status`} 
                                                    data={dataStatusTicket}
                                                    label={`Status:`}
                                                    />
                                            </div>
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
                            <div className="row">
                                <div className="col-md">
                                    <h5 className={dataTicket.length > 0 && dataTicket[0].status == 1 ? `text-primary` : ``}>Abertos</h5>
                                </div>
                                <div className="col-md">
                                    <h5 className={dataTicket.length > 0 && dataTicket[0].status == 2 ? `text-primary` : ``}>Andamento</h5>
                                </div>
                                <div className="col-md">
                                    <h5 className={dataTicket.length > 0 && dataTicket[0].status == 3 ? `text-primary` : ``}>Pendente</h5>
                                </div>
                                <div className="col-md">
                                    <h5 className={dataTicket.length > 0 && dataTicket[0].status == 4 ? `text-primary` : ``}>Resolvido</h5>
                                </div>
                                <div className="col-md">
                                    <h5 className={dataTicket.length > 0 && dataTicket[0].status == 5 ? `text-primary` : ``}>Cancelado</h5>
                                </div>
                            </div>

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
const mapStateToProps = state => ({ ticketsSetor: state.ticketsSetor, auth: state.auth})

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarTicketsSetor, buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);