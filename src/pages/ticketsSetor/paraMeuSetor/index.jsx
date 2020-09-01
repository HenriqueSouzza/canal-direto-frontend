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

import { buscarTicketsSetor } from './actions';

import moment from 'moment';

class Index extends Component{

    componentDidMount(){
        this.props.buscarTicketsSetor("&where[aberto]=1&where[usuario_atendente]=")
    }

    onSubmit = values => {
        let $where = ''

        switch (values.status) {
            case 'fechado':
                $where += "&where[fechado]=1"
                break;

            case 'pendente':
                $where += "&where[pendente]=1"
                break;

            case 'aberto':
                $where += "&where[aberto]=1&where[usuario_atendente]="
                break;
        }

        if(values.dt_ini && values.dt_fim){
            $where += "&whereBetween[dt_criacao]=" + String(values.dt_ini) + ',' + String(values.dt_fim)
        }

        this.props.buscarTicketsSetor($where)
    }

    render(){

        const { loading, meuSetor } = this.props.ticketsSetor

        const dataStatusTicket = [
            {id: 'aberto', name: 'Aberto'},
            // {id: 'pendente', name: 'Pendente'},
            {id: 'fechado', name: 'Fechado'},
        ];

        const dataTicket = []
        
        if(meuSetor.response){
            meuSetor.response.content.map(row => {
                dataTicket.push({
                    ticket: row.id,
                    assunto: row.assunto,
                    setor: row.setor,
                    categoria: row.categoria,
                    criado: moment(row.created_at).calendar(),
                    atualizacao: row.dt_interacao ? moment(row.dt_interacao).calendar() : moment(row.created_at).calendar(),
                    // criado: moment(row.created_at).format('DD-MM-YYYY H:mm'),
                    link: '/tickets-setor/para-meu-setor/' + row.id + '/visualizar'
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
                            </Link>
            }   
        ];

        const initialValues = {
            status: 'aberto'
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
                                                    icon={false}
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
                                                    icon={false}
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarTicketsSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);