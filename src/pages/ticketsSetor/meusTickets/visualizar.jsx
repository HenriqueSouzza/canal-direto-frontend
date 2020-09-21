import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import  Select  from '../../../components/form/select';

import  Input  from '../../../components/form/input';

import  Button  from '../../../components/form/button';

import { FORM_RULES } from '../../../helpers/validations';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import ChatCard from '../../../components/chat/chatCard';

import InformacoesAluno from '../components/InformacoesAluno';

import InformacoesFuncionario from '../components/InformacoesFuncionario';

import InformacoesDocente from '../components/InformacoesDocente';

import { buscarMeusTickets, salvarInteracao, encaminharTicket, fecharTicket, buscarInteracoesTicket, buscarSetor, buscarCategoria } from  '../actions';

import moment from 'moment';

import { USER_LOGGED } from '../../../config/const';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarMeusTickets('&where[id]=' + this.props.match.params.id)
        this.props.buscarSetor()
        // this.props.buscarInteracoesTicket(this.props.match.params.id)
    }

    componentDidUpdate(){
        if(!this.props.ticketsSetor.loading && this.props.ticketsSetor.meusTickets.response){
            if(this.props.ticketsSetor.meusTickets.response.content.length < 1){
                this.props.history.push('/tickets-setor/meus-tickets')
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

    onVoltar = () => {
        this.props.history.goBack()
    }

    
    // Ação para fechar ticket
    onFecharTicket = () => {
        const values = {}

        values.status = 4
        values.publico = 1
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

        const { loading, meusTickets, dadosSetor, dadosCategoria, interacoesTickets } = this.props.ticketsSetor

        const dataTicket = {}

        if(meusTickets.response){
            meusTickets.response.content.find(element => {
                if(element.id == this.props.match.params.id){
                    dataTicket.id = element.id
                    dataTicket.assunto = element.assunto
                    dataTicket.usuario_abertura = element.usuario_abertura
                    dataTicket.papel_usuario = element.papel_usuario
                    dataTicket.setor = element.setor
                    dataTicket.categoria = element.categoria
                    dataTicket.mensagem = element.mensagem
                    dataTicket.arquivo = element.arquivo
                    dataTicket.status = element.status
                    dataTicket.created_at = element.created_at
                }
            })
        }

        const dataInteracao = []

        if(interacoesTickets.response){
            interacoesTickets.response.content.find(element => {
                if(element.id_ticket == this.props.match.params.id){
                    dataInteracao.push({
                        solicitante: USER_LOGGED.usuario == element.usuario_interacao ? 1 : 0,
                        usuario_interacao: element.usuario_interacao,
                        mensagem: element.mensagem,
                        arquivo: element.arquivo,
                        dt_criacao: moment(element.dt_criacao).calendar(),
                        privado: element.privado
                    })
                }
            })
        }

        const dataSetor = []

        if(dadosSetor.response){
            dadosSetor.response.content.map(row => {
                dataSetor.push({
                    id: row.id,
                    name: row.descricao,
                })
            })
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
                                dataTicket.papel_usuario == 1 ? 
                                    <InformacoesFuncionario 
                                        data={dataTicket}
                                        onVoltar={this.onVoltar}
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

                    { dataTicket.status && (dataTicket.status.ordem == 4 || dataTicket.status.ordem == 5) ?
                        <div className="col-md-12">
                            <div className="content-fluid">
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h5 className="card-title">Deseja fechar o chamado ?</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    <Form
                                                        onSubmit={this.onFecharTicket}
                                                        render={({handleSubmit, submitSucceeded, pristine}) => (
                                                            <form onSubmit={handleSubmit} onChange={(e) => this.onChangeForm(e)}>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <Field 
                                                                            component={Input} 
                                                                            name={`setor`} 
                                                                            data={dataSetor}
                                                                            label={`Setor:`}
                                                                            validate={''}
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
                                                                            icon={`fa fa-check`}
                                                                            description={`Fechar`}
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
                                                                            validate={''}
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

                    
                    <div className="col-md-12">
                        <ChatCard
                            dataComment={dataInteracao}
                            titleChat={`Interações`}
                            addComment={this.onSubmit}
                            enableComment={dataTicket.status && dataTicket.status.ordem != 4 && dataTicket.status.ordem != 5}
                            enableTypeReposta={true}
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
const mapStateToProps = state => ({ ticketsSetor: state.ticketsSetor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets, salvarInteracao, encaminharTicket, fecharTicket, buscarInteracoesTicket, buscarSetor, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);