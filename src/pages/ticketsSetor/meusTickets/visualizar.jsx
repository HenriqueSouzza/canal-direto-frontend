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

import { buscarMeusTickets, salvarInteracao, encaminharTicket, buscarInteracoesTicket, buscarSetor, buscarCategoria } from  './actions';

import moment from 'moment';

import { USER_LOGGED } from '../../../config/const';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarMeusTickets('&where[id]=' + this.props.match.params.id)
        this.props.buscarInteracoesTicket('?where[id_ticket]=' + this.props.match.params.id)
        this.props.buscarSetor()
    }

    onSubmit = values => {

        values.status = values.fechar ? 4 : 3
        values.dt_fechamento = values.fechar ? moment().format('YYYY-MM-DD H:mm:ss') : ''

        this.props.salvarInteracao(values, this.props.match.params.id, this.props.history)
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

    //
    onChangeForm = event => {
        
        if(event.target.name == 'setor' && event.target.value){
            this.props.buscarCategoria('?where[id_setor]=' + event.target.value)
        }
        
    }

    render(){

        const { loading, meusTickets, dadosSetor, dadosCategoria, interacoesTickets } = this.props.ticketsSetor

        let dataTicket = {}

        if(meusTickets.response){
            dataTicket.id = meusTickets.response.content[0].id
            dataTicket.assunto = meusTickets.response.content[0].assunto
            dataTicket.usuario_abertura = meusTickets.response.content[0].usuario_abertura
            dataTicket.papel_usuario = meusTickets.response.content[0].papel_usuario
            dataTicket.setor = meusTickets.response.content[0].setor
            dataTicket.categoria = meusTickets.response.content[0].categoria
            dataTicket.mensagem = meusTickets.response.content[0].mensagem
            dataTicket.arquivo = meusTickets.response.content[0].arquivo
            dataTicket.status = meusTickets.response.content[0].status
            dataTicket.created_at = meusTickets.response.content[0].created_a
        }

        let dataInteracao = []

        if(interacoesTickets.response){
            dataInteracao = interacoesTickets.response.content.map(row => ({
                solicitante: USER_LOGGED.usuario == row.usuario_interacao ? 1 : 0,
                usuario_interacao: row.usuario_interacao,
                mensagem: row.mensagem,
                arquivo: row.arquivo,
                dt_criacao: moment(row.dt_criacao).calendar(),
                privado: row.privado
            }))
        }

        let dataSetor = []

        if(dadosSetor.response){
            dataSetor = dadosSetor.response.content.map(row => ({
                id: row.id,
                name: row.descricao
            }))
        }       

        let dataCategoria = []
 
        if(dadosCategoria.response){
            dataCategoria = dadosCategoria.response.content.map(row => {
                if(row.descricao != dataTicket.categoria){
                    return {
                        id: row.id,
                        name: row.descricao,
                    }
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

                    <div className="col-md-12">
                        <ChatCard
                            dataComment={dataInteracao}
                            titleChat={`Interações`}
                            addComment={this.onSubmit}
                            enableComment={dataTicket.status && dataTicket.status.ordem != 4 && dataTicket.status.ordem != 5}
                            enableTypeReposta
                            enableCloseTicket
                            enableAnexo
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets, salvarInteracao, encaminharTicket, buscarInteracoesTicket, buscarSetor, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);