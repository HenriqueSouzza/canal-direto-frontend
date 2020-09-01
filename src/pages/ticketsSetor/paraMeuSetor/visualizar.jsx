import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import  Select  from '../../../components/form/select';

import  Button  from '../../../components/form/button';

import { FORM_RULES } from '../../../helpers/validations';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import ChatCard from '../../../components/chat/chatCard';

import InformacoesAluno from '../components/InformacoesAluno';

import InformacoesFuncionario from '../components/InformacoesFuncionario';

import InformacoesDocente from '../components/InformacoesDocente';

import { encaminharTicket, fecharTicket, responderTicket } from  './actions';

import { salvarInteracao, buscarInteracoesTicket, buscarSetor, buscarCategoria } from  '../actions';

import moment from 'moment';

import { USER_LOGGED } from '../../../config/const';


class Visualizar extends Component{

    constructor(props){
        super(props)

        if(this.props.ticketsSetor.meuSetor.length <= 0){
            this.props.history.goBack()
        }
    }

    componentDidMount(){
        this.props.buscarInteracoesTicket(this.props.match.params.id)
        this.props.buscarSetor()
    }

    onSubmit = values => {

        values.acao = 'responder'
        values.id_ticket = this.props.match.params.id

        this.props.salvarInteracao(values)
        
    }

    onSubmitEncaminhar = (values) => {

        values.mensagem = 'Ticket designado para ' + USER_LOGGED.usuario
        this.props.encaminharTicket(values, this.props.match.params.id, this.props.history)

    }

    onResponder = () => {
        const values = {}

        values.mensagem = 'Ticket designado para ' + USER_LOGGED.usuario 

        this.props.responderTicket(values, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    /**
     * Ação para fechar ticket
     */
    onFecharTicket = () => {
        const values = {}

        values.fechado = 1
        values.mensagem = 'Ticket fechado'
        values.dt_fechamento = moment().format('YYYY-MM-DD H:mm:ss')
        this.props.fecharTicket(values, this.props.match.params.id, this.props.history)
    }

    //
    onChangeForm = event => {
        
        if(event.target.name == 'setor' && event.target.value){
            this.props.buscarCategoria(event.target.value)
        }
        
    }

    render(){

        const { loading, meuSetor, dadosSetor, dadosCategoria, interacoesTickets } = this.props.ticketsSetor

        const dataTicket = {}

        if(meuSetor.response){
            if(Array.isArray(meuSetor.response.content)){
                meuSetor.response.content.find(element => {
                    if(element.id == this.props.match.params.id){
                        dataTicket.id = element.id
                        dataTicket.assunto = element.assunto
                        dataTicket.usuario_abertura = element.usuario_abertura
                        dataTicket.papel_usuario = element.papel_usuario
                        dataTicket.fechado = element.fechado
                        dataTicket.usuario_atendente = element.usuario_atendente
                        dataTicket.setor = element.setor
                        dataTicket.categoria = element.categoria
                        dataTicket.mensagem = element.mensagem
                        dataTicket.arquivo = element.arquivo
                        dataTicket.created_at = element.created_at
                    }
                 })
            }else{
                if(meuSetor.response.content.id  == this.props.match.params.id ){
                    dataTicket.id = meuSetor.response.content.id
                    dataTicket.assunto = meuSetor.response.content.assunto
                    dataTicket.usuario_abertura = meuSetor.response.content.usuario_abertura
                    dataTicket.papel_usuario = meuSetor.response.content.papel_usuario
                    dataTicket.fechado = meuSetor.response.content.fechado
                    dataTicket.usuario_atendente = meuSetor.response.content.usuario_atendente
                    dataTicket.setor = meuSetor.response.content.setor
                    dataTicket.categoria = meuSetor.response.content.categoria
                    dataTicket.mensagem = meuSetor.response.content.mensagem
                    dataTicket.arquivo = meuSetor.response.content.arquivo
                    dataTicket.created_at = meuSetor.response.content.created_at
                }
            }
        }

        const dataInteracao = []

        if(interacoesTickets.response){
            if(Array.isArray(interacoesTickets.response.content)){
                interacoesTickets.response.content.find(element => {
                    if(element.id_ticket == this.props.match.params.id){
                        dataInteracao.push({
                            solicitante: USER_LOGGED.usuario == element.usuario_interacao ? 1 : 0 ,
                            usuario_interacao: element.usuario_interacao,
                            mensagem: element.mensagem,
                            arquivo: element.arquivo,
                            dt_criacao: moment(element.dt_criacao).calendar(),
                        })
                    }
                 })
            }else{
                if(interacoesTickets.response.content.id_ticket  == this.props.match.params.id ){
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

        const dataSetor = []

        if(dadosSetor.response){
            if(Array.isArray(dadosSetor.response.content)){
                dadosSetor.response.content.map(row => {
                    dataSetor.push({
                        id: row.id,
                        name: row.descricao,
                    })
                })
            }else{
                dataSetor.push({
                    id: dadosSetor.response.content.id,
                    name: dadosSetor.response.content.descricao,
                })
            }
        }       

        const dataCategoria = []
 
        if(dadosCategoria.response){
            if(Array.isArray(dadosCategoria.response.content)){
                dadosCategoria.response.content.map(row => {
                    if(row.descricao != dataTicket.categoria){
                        dataCategoria.push({
                            id: row.id,
                            name: row.descricao,
                        })
                    }
                })
            }else{
                if(dadosCategoria.response.content.descricao != dataTicket.categoria){
                    dataCategoria.push({
                        id: dadosCategoria.response.content.id,
                        name: dadosCategoria.response.content.descricao,
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
                        <div className="content-fluid">
                            {
                                dataTicket.papel_usuario == 1 ? 
                                    <InformacoesFuncionario 
                                        data={dataTicket}
                                        loading={loading}
                                        onVoltar={this.onVoltar}
                                        onFechar={dataTicket.fechado ? false : this.onFecharTicket}
                                        onResponder={dataTicket.usuario_atendente ? false : this.onResponder}
                                    />
                                : dataTicket.papel_usuario == 2 ? 
                                    <InformacoesAluno 
                                        data={dataTicket}
                                    />
                                : dataTicket.papel_usuario == 3 ? 
                                    <InformacoesDocente 
                                        data={dataTicket}
                                    />
                                : ''
                            }
                        </div>
                    </div>

                    { !dataTicket.fechado ?
                        <div className="col-md-12">
                            <div className="content-fluid">
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h5 className="card-title">Encaminhar</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    <Form
                                                        onSubmit={this.onSubmitEncaminhar}
                                                        render={({handleSubmit, submitSucceeded, pristine}) => (
                                                            <form onSubmit={handleSubmit} onChange={(e) => this.onChangeForm(e)}>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <Field 
                                                                            component={Select} 
                                                                            name={`setor`} 
                                                                            data={dataSetor}
                                                                            label={`Setor:`}
                                                                            validate={FORM_RULES.required}
                                                                        />

                                                                    </div> 
                                                                    <div className="col-md-6"> 
                                                                        <Field 
                                                                            component={Select} 
                                                                            name={`categoria`} 
                                                                            data={dataCategoria}
                                                                            label={`Categoria:`}
                                                                            validate={FORM_RULES.required}
                                                                            /> 
                                                                    </div>                                                          
                                                                </div> 
                                                                <div className="row justify-content-center">
                                                                    <div className="col-md-4">
                                                                        <Button
                                                                            type={`submit`}
                                                                            className={`col-md-10`}
                                                                            color={`btn-success col-md-10`}
                                                                            disabled={submitSucceeded || pristine}
                                                                            icon={`fa fa-share`}
                                                                            description={`Encaminhar`}
                                                                            />
                                                                    </div>
                                                                </div>                                                 
                                                            </form>
                                                    )}/>                                                                          
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    : 
                        ''
                    }

                    {   dataTicket.usuario_atendente == USER_LOGGED.usuario ?
                            <div className="col-md-12">
                                <ChatCard
                                    dataComment={dataInteracao}
                                    titleChat={`Interações`}
                                    addComment={this.onSubmit}
                                    enableComment={!dataTicket.fechado}
                                    enableTypeReposta={true}
                                    enableAnexo={true}
                                />
                            </div>
                    :   ''}
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
const mapDispatchToProps = dispatch => bindActionCreators({ salvarInteracao, encaminharTicket, fecharTicket, responderTicket, buscarInteracoesTicket, buscarSetor, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);