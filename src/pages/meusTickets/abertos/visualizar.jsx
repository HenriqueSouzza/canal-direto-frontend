import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import ChatCard from '../../../components/chat/chatCard';

import { salvarInteracao, buscarInteracoesTicket} from  '../actions';


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

        values.acao = 'responder'
        values.papel_usuario = 1
        values.id_ticket = this.props.match.params.id

        this.props.salvarInteracao(values)

    }

    onVoltar = () => {
        this.props.history.goBack()
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
                            arquivo: element.arquivo,
                            dt_criacao: element.dt_criacao,
                        })
                    }
                 })
            }else{
                if(interacoesTickets.response.content.id_ticket  == this.props.match.params.id ){
                    dataInteracao.push({
                        usuario_interacao: interacoesTickets.response.content.usuario_interacao,
                        mensagem: interacoesTickets.response.content.mensagem,
                        arquivo: interacoesTickets.response.content.arquivo,
                        dt_criacao: interacoesTickets.response.content.dt_criacao
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
const mapDispatchToProps = dispatch => bindActionCreators({ salvarInteracao, buscarInteracoesTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);