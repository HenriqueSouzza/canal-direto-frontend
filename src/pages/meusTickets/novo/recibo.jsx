import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';

import Button from '../../../components/form/button';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import { buscarMeusTickets } from './actions';

import PaginaNaoEncontrada from '../../errosPagina/paginaNaoEncontrada';


class Recibo extends Component{

    //Função que ao criar o component ele busca os setor que o usuario logado tem acesso
    componentDidMount(){
        this.props.buscarMeusTickets('?where[id]=' + this.props.match.params.id)
    }

    onVisualizarTicketAberto = () => {
        this.props.history.push('/meus-tickets/abertos')
    }

    onAbrirTicket = () => {
        this.props.history.push('/meus-tickets/novo')
    }

    render(){

        const { loading, meusTickets } = this.props.meusTickets

        let dataTicket = {}

        if(meusTickets.response){

            if(meusTickets.response.content.length < 1){
                return (
                    <section className="content">
                        <PaginaNaoEncontrada />
                    </section>
                )
            }

            dataTicket = {
                solicitante: meusTickets.response.content[0].usuario_abertura[0].nome,
                ticket: meusTickets.response.content[0].id,
                assunto: meusTickets.response.content[0].assunto,
                setor: meusTickets.response.content[0].setor,
                categoria: meusTickets.response.content[0].categoria,
                mensagem: meusTickets.response.content[0].mensagem,
                arquivo: meusTickets.response.content[0].arquivo,
            }
        }

        return (
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={``} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-header">
                            {/* <div className="text-center">
                                <h4 className="">Comprovante</h4>
                            </div> */}
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-6 border border-primary text-center">
                                    <div className="col-md-12 p-1 bg-info">
                                        <h5>Comprovante</h5>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        Olá <b>{dataTicket.solicitante ? dataTicket.solicitante : ''}</b>
                                        <br/>
                                        Recebemos seu ticket nº <b>{dataTicket.ticket ? dataTicket.ticket : ''}</b> no nosso <b>Canal Direto</b>
                                    </div>
                                    <br/>
                                    <div className="col-md-12 text-success border border-success">
                                        <div className="col-md-12 mt-2">
                                            <i className="fa fa-check-circle" style={{color: 'green', fontSize: '30px'}}></i>
                                        </div>
                                        <b>Recebemos seu ticket</b>
                                        <br/>
                                        Aguarde seu atendimento que em breve retornaremos
                                    </div>
                                    <br/>
                                    <div className="col-md-12 text-center bg-info">
                                        <b>Detalhes do ticket</b>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="">
                                                <b>Nº Ticket:</b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                {dataTicket.ticket ? dataTicket.ticket : ''}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                <b>Assunto:</b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                {dataTicket.assunto ? dataTicket.assunto : ''}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                <b>Setor:</b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                {dataTicket.setor ? dataTicket.setor : ''}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                <b>Categoria:</b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                {dataTicket.categoria ? dataTicket.categoria : ''}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                <b>Mensagem:</b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                {dataTicket.mensagem ? dataTicket.mensagem : ''}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="">
                                                <b>Anexos:</b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
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
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <Button
                                        type={`button`}
                                        description={`Visualizar tickets abertos`}
                                        color={`btn btn-dark`}
                                        onClick={() => this.onVisualizarTicketAberto()}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Button
                                        type={`button`}
                                        description={`Abrir novo ticket`}
                                        color={`btn btn-success`}
                                        onClick={() => this.onAbrirTicket()}
                                    />
                                </div>
                            </div>
                            {/* <div className="text-center">
                                <h4 className="">Comprovante</h4>
                            </div> */}
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
const mapStateToProps = state => ({ meusTickets: state.meusTickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Recibo);