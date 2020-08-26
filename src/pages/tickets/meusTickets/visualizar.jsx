import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import Button from '../../../components/form/button';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import textArea from '../../../components/form/textArea';

import ChatCard from '../../../components/chat/chatCard';

import { salvarInteracao, buscarInteracoesTicket, fecharTicket,buscarSetor, buscarCategoria} from  '../actions';

import moment from 'moment';

import  Select  from '../../../components/form/select'

class Visualizar extends Component{

    constructor(props){
        super(props)

        if(this.props.tickets.meusTickets.length <= 0){
            this.props.history.goBack()
        }

    }

    componentDidMount(){
        this.props.buscarInteracoesTicket(this.props.match.params.id)
        this.props.buscarSetor()
        
    }

    onSubmit = (values) => {

        values.acao = 'responder'
        values.papel_usuario = 1
        values.id_ticket = this.props.match.params.id
        values.mensagem = values.message

        this.props.salvarInteracao(values)
        
    }

    onSubmitEncaminhar = (values) => {
        console.log(values)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    /**
     * Ação para fechar ticket
     */
    onFecharTicket = () => {
        const values = {}

        values.status = 'fechado'
        values.dt_fechamento = moment().format()
        this.props.fecharTicket(values, this.props.match.params.id, this.props.history)
    }

    onChange = event => {

        
        if(event.target.name == 'setor' && event.target.value){
            this.props.buscarCategoria(event.target.value)
        }
    }

    render(){

        const {  meusTickets, interacoesTickets } = this.props.tickets

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
                    dataTicket.status = meusTickets.response.content.status
                    dataTicket.created_at = meusTickets.response.content.created_at
                }
            }
        }

        const dataInteracao = []

        if(interacoesTickets.response){
            if(Array.isArray(interacoesTickets.response.content)){
                interacoesTickets.response.content.find(element => {
                    if(element.id_ticket == this.props.match.params.id){
                        dataInteracao.push({
                            solicitante: element.usuario_interacao == dataTicket.usuario_abertura ? 1 : 0,
                            usuario_interacao: element.usuario_interacao,
                            mensagem: element.mensagem,
                            dt_criacao: element.dt_criacao,
                        })
                    }
                 })
            }else{
                if(interacoesTickets.response.content.id_ticket  == this.props.match.params.id ){
                    dataInteracao.push({
                        usuario_interacao: interacoesTickets.response.content.usuario_interacao,
                        mensagem: interacoesTickets.response.content.mensagem,
                        dt_criacao: interacoesTickets.response.content.dt_criacao
                    })
                }
            }
        }

        const { loading, dadosSetor, dadosCategoria } = this.props.tickets

        let dataSetor = []

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

        let dataCategoria = []
 
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
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h5 className="card-title">Informações</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Autor:</label>
                                            <div className="">{dataTicket.usuario_abertura}</div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Assunto:</label>
                                            <div className="">{dataTicket.assunto}</div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Setor/Categoria:</label>
                                            <div className="">{dataTicket.setor} - {dataTicket.categoria}</div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row justify-content-center text-center">
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-dark col-md-10" onClick={() => this.onVoltar()}>
                                                <i className="fa fa-arrow-left"></i> Voltar
                                            </button>
                                        </div>
                                        { dataTicket.status != 'fechado' ?
                                            <>
                                            <div className="col-md-3">
                                                <button type="button" className="btn btn-primary col-md-10" onClick={() => this.onFecharTicket(dataTicket.id)}>
                                                    <i className="fa fa-check"></i> Fechar Ticket
                                                </button>
                                            </div>
                                            </>
                                        : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        { dataTicket.status != 'fechado' ?
                            <div className="content-fluid">
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h5 className="card-title">Encaminhar</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>Setor/Categoria:</label>
                                                <div className="">{dataTicket.setor} - {dataTicket.categoria}</div>
                                                <div className="col-md-12">
                                                    <Form
                                                        onSubmit={this.onSubmitEncaminhar}
                                                        render={({handleSubmit,submitSucceeded,pristine}) => (<form onSubmit={handleSubmit} onChange={(e) => this.onChange(e)}>
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
                                                                        <button 
                                                                            type="button" 
                                                                            className="btn btn-success col-md-10" 
                                                                            disabled={submitSucceeded || pristine}
                                                                            onClick={() => this.setState({onResponder: 1})}>
                                                                            <i className="fa fa-share"></i> Encaminhar
                                                                        </button>
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
                        : 
                            ''
                        }
                    </div>

                    
                    <div className="col-md-12">
                        {/* <ChatCard
                            dataComment={dataInteracao}
                            titleChat={`Interações`}
                            addComment={this.onSubmit}
                            enableComment={dataTicket.status != 'fechado'}
                        /> */}
                    </div>
                </div>
            </section>
        )

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ tickets: state.tickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ salvarInteracao, buscarInteracoesTicket, fecharTicket, buscarSetor, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);