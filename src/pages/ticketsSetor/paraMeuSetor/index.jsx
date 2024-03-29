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

import { buscarTicketsSetor, buscarStatusTicket } from './actions';

import moment from 'moment';


class Index extends Component{

    componentDidMount(){
        let setor = []
        
        this.props.auth.user.categoriaAtendente.map(row => setor.push(row.setor.map(val => val.id)))

        let whereIn = "?where[status]=1"

        if(setor.length > 0){
            whereIn += '&whereIn[setor]=' + setor.toString()
        }

        this.props.buscarTicketsSetor(whereIn)
        this.props.buscarStatusTicket()

    }

    onSubmit = values => {
        let where = ''

        if(values.status){
            where += "?where[status]=" + values.status
        }
        
        if(values.ticket){
            if(values.status){
                where += "&where[id]=" + values.ticket
            }else{
                where += "?where[id]=" + values.ticket
            }
        }

        if(values.assunto){
            if(values.status || values.ticket){
                where += "&like=assunto," + values.assunto
            }else{
                where += "?like=assunto," + values.assunto
            }
        }

        if(values.dt_ini && values.dt_fim){
            if(values.status || values.ticket || values.assunto){
                where += "&whereBetween[dt_criacao]=" + String(values.dt_ini) + ',' + String(values.dt_fim) 
            }else{
                where += "?whereBetween[dt_criacao]=" + String(values.dt_ini) + ',' + String(values.dt_fim)
            }
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
                link: '/tickets-setor/para-meu-setor/' + row.id + '/visualizar',
                quantidadeTicket: row.quantidade_ticket
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
                                                    placeholder={``}
                                                    // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`dt_fim`} 
                                                    label={`Data final:`}
                                                    icon={``}
                                                    placeholder={``}
                                                    // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
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
                                                dataTicket[0].quantidadeTicket.map(val => (
                                                    val.ordem == row.id ?
                                                        <h5 className={parseInt(dataTicket[0].status) == row.id ? `text-primary` : ``}>
                                                            ({val.quantidade}) {val.nome}
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
                                    dataTicket[0].quantidadeTicket.map((row,index) => (
                                        <div className="col-md" key={index}>
                                            <h5 className={parseInt(dataTicket[0].status) == row.ordem ? `text-primary` : ``}>
                                                ({row.quantidade}) {row.nome}
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
                                loading={loading || !meuSetor.response} 
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