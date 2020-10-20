import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import ChatCard from '../../../components/chat/chatCard';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import { buscarMeusTickets, salvarInteracao, buscarInteracoesTicket } from  './actions';

import moment from 'moment';

import PaginaNaoEncontrada from '../../errosPagina/paginaNaoEncontrada';

class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarInteracoesTicket('?where[id_ticket]=' + this.props.match.params.id)
        this.props.buscarMeusTickets('&where[usuario]='+ this.props.auth.user.email + '&where[id]=' + this.props.match.params.id)
    }

    onSubmit = (values) => {
        
        const { meusTickets } = this.props.meusTickets

        const params = {
            status: meusTickets.response.content[0].usuario_atendente ? 2 : 1,
            dt_fechamento: '',
            mensagem: 'Ticket reaberto pelo solicitante: ' + values.mensagem,
            usuario: this.props.auth.user.email,
            papel_usuario: this.props.auth.user.papelPrincipal[0].id
        }

        this.props.salvarInteracao(params, this.props.match.params.id, this.props.history)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, meusTickets, interacoesTickets } = this.props.meusTickets

        const dataTicket = {}

        if(meusTickets.response){

            if(meusTickets.response.content.length < 1){
                return (
                    <section className="content">
                        <PaginaNaoEncontrada />
                    </section>
                )
            }
            
            dataTicket.id =  meusTickets.response.content[0].id
            dataTicket.assunto =  meusTickets.response.content[0].assunto
            dataTicket.usuario_abertura =  meusTickets.response.content[0].usuario_abertura
            dataTicket.setor =  meusTickets.response.content[0].setor
            dataTicket.categoria =  meusTickets.response.content[0].categoria
            dataTicket.mensagem =  meusTickets.response.content[0].mensagem
            dataTicket.status =  meusTickets.response.content[0].status
            dataTicket.usuario_atendente =  meusTickets.response.content[0].usuario_atendente
            dataTicket.created_at =  meusTickets.response.content[0].created_at
        }

        let dataInteracao = []

        if(interacoesTickets.response){
            dataInteracao = interacoesTickets.response.content.map(row => ({
                solicitante: this.props.auth.user.email  == row.usuario_interacao ? 1 : 0,
                usuario_interacao: row.usuario_interacao,
                mensagem: row.mensagem,
                arquivo: row.arquivo,
                dt_criacao: moment(row.dt_criacao).calendar()
            }))
        }


        return (
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Detalhe do ticket`} history={this.props.location.pathname} />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-danger">
                            <div className="card-header">
                                <h3 className="card-title">Assunto: {dataTicket.assunto ? dataTicket.assunto : '-'}</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Mensagem:</label>
                                        <div className="">
                                            {dataTicket.mensagem ? dataTicket.mensagem : '-'}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Anexo:</label>
                                        <div className="">
                                            {
                                                dataTicket.arquivo && dataTicket.arquivo.length > 0 ?
                                                    dataTicket.arquivo.map((row, index) => (
                                                        <span className={`mr-3 mt-2`} key={index}>
                                                            <Link to={{pathname: row}} target="_blank" className={`btn btn-default`} download>
                                                                <i className="fa fa-paperclip"></i> Anexo {index + 1}
                                                            </Link>
                                                        </span>
                                                    ))
                                                :
                                                    'Nenhum anexo'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center">
                                        <button type="button" className="btn btn-dark col-md-6" onClick={() => this.onVoltar()}>
                                            <i className="fa fa-arrow-left"></i> Voltar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { (dataTicket.status) && (dataTicket.status.ordem == 4 || dataTicket.status.ordem == 5) ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Deseja reabrir chamado ?</h3>
                                </div>
                                <div className="card-body">
                                <Form
                                        onSubmit={this.onSubmit}
                                        render={({handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-8">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`mensagem`} 
                                                            label={`Motivo reabertura:`}
                                                            icon={`fa fa-comment`}
                                                            placeholder={`Digite o motivo da reabertura`}
                                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div>
                                                    <div className="col-md-4 text-center">
                                                        <label>&nbsp;</label>
                                                        <Field
                                                            component={Button}
                                                            name={`btn-button`}
                                                            description={`Reabrir`}
                                                            type={`submit`}
                                                            icon={`fa fa-edit`}
                                                            color={`btn-success`}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                    )}/>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    ''
                }
                <div className="row">
                    <div className="col-md-12">
                        <ChatCard
                            dataComment={dataInteracao}
                            titleChat={`Interações`}
                            addComment={false}
                            enableComment={false}
                            enableAnexo={false}
                        />
                    </div>
                </div>
            </section>
        )

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ meusTickets: state.meusTickets, auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets, salvarInteracao, buscarInteracoesTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);