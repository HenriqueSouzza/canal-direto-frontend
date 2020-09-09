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

import { salvarInteracao, buscarInteracoesTicket, fecharTicket} from  '../actions';

import { USER_LOGGED } from '../../../config/const';

import moment from 'moment';


class Visualizar extends Component{

    constructor(props){
        super(props)

        if(this.props.meusTickets.meusTickets.length <= 0){
            this.props.history.goBack()
        }

    }

    componentDidMount(){
        this.props.buscarInteracoesTicket(this.props.match.params.id)
    }

    onSubmit = (values) => {

        values.papel_usuario = 1
        values.id_ticket = this.props.match.params.id

        this.props.salvarInteracao(values)

    }

    onVoltar = () => {
        this.props.history.push('/meus-tickets/abertos')
    }

    onFechar = values => {

        values.status = 5
        values.publico = 1
        values.mensagem = 'Ticket fechado pelo solicitante: ' + values.mensagem_temp
        values.dt_fechamento = moment().format('YYYY-MM-DD H:mm:ss')

        this.props.fecharTicket(values, this.props.match.params.id, this.props.history)
    }

    render(){

        const { loading, meusTickets, interacoesTickets } = this.props.meusTickets

        const dataTicket = {}

        if(meusTickets.response){
            if(Array.isArray(meusTickets.response.content)){
                meusTickets.response.content.find(element => {
                    if(element.id == this.props.match.params.id){
                        dataTicket.id = element.id
                        dataTicket.assunto = element.assunto
                        dataTicket.usuario_abertura = element.usuario_abertura
                        dataTicket.setor = element.setor
                        dataTicket.categoria = element.categoria
                        dataTicket.mensagem = element.mensagem
                        dataTicket.arquivo = element.arquivo
                        dataTicket.status = element.status
                        dataTicket.created_at = element.created_at
                    }
                 })
            }else{
                if(meusTickets.response.content.id  == this.props.match.params.id ){
                    dataTicket.id = meusTickets.response.content.id
                    dataTicket.assunto = meusTickets.response.content.assunto
                    dataTicket.usuario_abertura = meusTickets.response.content.usuario_abertura
                    dataTicket.setor = meusTickets.response.content.setor
                    dataTicket.categoria = meusTickets.response.content.categoria
                    dataTicket.mensagem = meusTickets.response.content.mensagem
                    dataTicket.arquivo = meusTickets.response.content.arquivo
                    dataTicket.status = meusTickets.response.content.status
                    dataTicket.created_at = meusTickets.response.content.created_at
                }
            }
        }

        const dataInteracao = []

        if(interacoesTickets.response){
            if(Array.isArray(interacoesTickets.response.content)){
                interacoesTickets.response.content.find(element => {
                    if(element.id_ticket == this.props.match.params.id && element.publico){
                        dataInteracao.push({
                            solicitante: USER_LOGGED.usuario == element.usuario_interacao ? 1 : 0,
                            usuario_interacao: element.usuario_interacao,
                            mensagem: element.mensagem,
                            arquivo: element.arquivo,
                            dt_criacao: moment(element.dt_criacao).calendar(),
                        })
                    }
                 })
            }else{
                if(interacoesTickets.response.content.id_ticket == this.props.match.params.id && interacoesTickets.response.content.publico){
                    dataInteracao.push({
                        solicitante: USER_LOGGED.usuario == interacoesTickets.response.content.usuario_interacao ? 1 : 0,
                        usuario_interacao: interacoesTickets.response.content.usuario_interacao,
                        mensagem: interacoesTickets.response.content.mensagem,
                        arquivo: interacoesTickets.response.content.arquivo,
                        dt_criacao: moment(interacoesTickets.response.content.dt_criacao).calendar()
                    })
                }
            }
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
                { dataTicket.status != 'Resolvido' || dataTicket.status != 'Cancelado' ? 
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title">Deseja fechar o Ticket ?</h3>
                                </div>
                                <div className="card-body">
                                <Form
                                        onSubmit={this.onFechar}
                                        render={({handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-8">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`mensagem_temp`} 
                                                            label={`Motivo para fechar:`}
                                                            icon={`fa fa-comment`}
                                                            placeholder={`Digite o motivo para fechar`}
                                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div>
                                                    <div className="col-md-4 text-center">
                                                        <label>&nbsp;</label>
                                                        <Field
                                                            component={Button}
                                                            description={`Fechar`}
                                                            type={`submit`}
                                                            icon={`fa fa-check`}
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
                            addComment={this.onSubmit}
                            enableComment={dataTicket.status != 'fechado'}
                            enableAnexo={true}
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
const mapStateToProps = state => ({ meusTickets: state.meusTickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ salvarInteracao, buscarInteracoesTicket, fecharTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);