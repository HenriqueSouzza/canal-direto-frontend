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

import { buscarInteracoesTicket, buscarTicketsSetor, buscarSetor, buscarCategoria, salvarInteracao, encaminharTicket, responderTicket } from  './actions';

import moment from 'moment';

import { USER_LOGGED } from '../../../config/const';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarTicketsSetor('&where[id]=' + this.props.match.params.id)
        this.props.buscarSetor()
        this.props.buscarInteracoesTicket(this.props.match.params.id)
    }

    componentDidUpdate(){
        if(!this.props.ticketsSetor.loading && this.props.ticketsSetor.meuSetor.response){
            if(this.props.ticketsSetor.meuSetor.response.content.length < 1){
                this.props.history.push('/tickets-setor/para-meu-setor')
            }
        }
    }

    onSubmit = values => {
        values.status = 3
        this.props.salvarInteracao(values, this.props.match.params.id)
    }

    onSubmitEncaminhar = (values) => {

        values.mensagem = 'Ticket designado para ' + USER_LOGGED.usuario
        values.publico = 1
        values.status = 1
        this.props.encaminharTicket(values, this.props.match.params.id, this.props.history)

    }

    onResponder = () => {
        const values = {}

        values.mensagem = 'Ticket designado para ' + USER_LOGGED.usuario 
        values.publico = 1
        values.status = 2

        this.props.responderTicket(values, this.props.match.params.id, this.props.history)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    //
    onChangeForm = event => {
        
        if(event.target.name == 'setor' && event.target.value){
            this.props.buscarCategoria('?where[id_setor]=' + event.target.value)
        }
        
    }

    render(){

        const { loading, meuSetor, dadosSetor, dadosCategoria, interacoesTickets } = this.props.ticketsSetor

        const dataTicket = {}

        if(meuSetor.response){
            dataTicket.id = meuSetor.response.content[0].id
            dataTicket.assunto = meuSetor.response.content[0].assunto
            dataTicket.usuario_abertura = meuSetor.response.content[0].usuario_abertura.length > 0 ? meuSetor.response.content[0].usuario_abertura[0] : []
            dataTicket.papel_usuario = meuSetor.response.content[0].papel_usuario
            dataTicket.usuario_atendente = meuSetor.response.content[0].usuario_atendente
            dataTicket.setor = meuSetor.response.content[0].setor
            dataTicket.categoria = meuSetor.response.content[0].categoria
            dataTicket.mensagem = meuSetor.response.content[0].mensagem
            dataTicket.arquivo = meuSetor.response.content[0].arquivo
            dataTicket.status = meuSetor.response.content[0].status
            dataTicket.created_at = meuSetor.response.content[0].dt_criacao
        }

        const dataInteracao = []

        if(interacoesTickets.response){
            interacoesTickets.response.content.find(element => {
                if(element.id_ticket == this.props.match.params.id){
                    dataInteracao.push({
                        solicitante: USER_LOGGED.usuario == element.usuario_interacao ? 1 : 0 ,
                        usuario_interacao: element.usuario_interacao,
                        mensagem: element.mensagem,
                        arquivo: element.arquivo,
                        dt_criacao: moment(element.dt_criacao).calendar(),
                        privado: element.privado
                    })
                }
            })
        }

        let dataSetor = []

        if(dadosSetor.response){
            dataSetor = dadosSetor.response.content.map(row => ({
                id: row.id,
                name: row.descricao,
            }))
        }       

        const dataCategoria = []
 
        if(dadosCategoria.response){
            dadosCategoria.response.content.map(row => {
                if(row.descricao != dataTicket.categoria){
                    dataCategoria.push({
                        id: row.id,
                        name: row.descricao,
                    })
                }
            })
        }

        return (
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Detalhe do ticket`} history={this.props.location.pathname} />
                <div className="row">
                    <div className="col-md-12">
                        <div className="content-fluid">
                            {
                                dataTicket.usuario_abertura && dataTicket.usuario_abertura.papel == 'funcionário' ? 
                                    <InformacoesFuncionario 
                                        data={dataTicket}
                                        loading={loading}
                                        onVoltar={this.onVoltar}
                                        onResponder={dataTicket.usuario_atendente ? false : this.onResponder}
                                    />
                                : dataTicket.usuario_abertura && dataTicket.usuario_abertura.papel == 'aluno' ? 
                                    <InformacoesAluno 
                                        data={dataTicket}
                                        loading={loading}
                                        onVoltar={this.onVoltar}
                                        onResponder={dataTicket.usuario_atendente ? false : this.onResponder}
                                    />
                                : dataTicket.usuario_abertura && dataTicket.usuario_abertura.papel == 'docente' ? 
                                    <InformacoesDocente 
                                        data={dataTicket}
                                        loading={loading}
                                        onVoltar={this.onVoltar}
                                        onResponder={dataTicket.usuario_atendente ? false : this.onResponder}
                                    />
                                : ''
                            }
                        </div>
                    </div>

                    <div className="col-md-12">
                        <ChatCard
                            dataComment={dataInteracao}
                            titleChat={`Interações`}
                            addComment={this.onSubmit}
                            enableTypeReposta={true}
                            enableAnexo={true}
                        />
                    </div>

                    { dataTicket.status && dataTicket.status.ordem != 4 && dataTicket.status.ordem != 5 ?
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
                        ''}
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarTicketsSetor, salvarInteracao, encaminharTicket, responderTicket, buscarInteracoesTicket, buscarSetor, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);