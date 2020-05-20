import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import LoadingBody from '../../../components/loading/loadingBody';



class PassoTres extends Component{

    onGerarBoleto = value => {
        window.open(value)
    }
    
    render(){

        let { loading, dadosInscricao } = this.props.acampUnidos

        return(
            <div className="text-left">
                <div className="text-left">
                    <LoadingBody status={loading} />
                    <div className="bg-secondary rounded text-center">
                        <h4>Comprovante de inscrição</h4>
                    </div>
                    <div className="content-fluid">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <h5> CPF: </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.cpf : 'Não divulgado'}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5> Nome completo: </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.nome_compl : ''}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5> Telefone: </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.telefone : ''}</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <h5>
                                            Evento:
                                        </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.nome_evento != null ? dadosInscricao.evento.nome_evento : 'Não divulgado'}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>
                                            Local:
                                        </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.local != null ? dadosInscricao.evento.local : 'Não divulgado'}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>
                                            Cidade:
                                        </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.cidade != null ? dadosInscricao.evento.cidade + '-' + dadosInscricao.evento.estado : 'Não divulgado'}</strong>
                                        </p>
                                    </div>
                                    
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <h5>
                                            Data do evento:
                                        </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.data != null ? dadosInscricao.evento.data : 'Não divulgado'}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>
                                            Valor:
                                        </h5>
                                        <p className="text-info">
                                            <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.valor != null ? 'R$ '+ dadosInscricao.evento.valor : 'Não divulgado'}</strong>
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5>
                                            Status pagamento:
                                        </h5>
                                        <p className={dadosInscricao.inscricao[0].status == 'PI' ? 'text-danger' : 'text-success'}>
                                            <strong>{dadosInscricao && dadosInscricao.inscricao && dadosInscricao.inscricao.length > 0 && dadosInscricao.inscricao[0].status != 'PI' ? 'Pago' : 'Pendente'}</strong>
                                        </p>
                                    </div>
                                </div>
                                { dadosInscricao.inscricao[0].status == 'PI' && dadosInscricao.inscricao[0].forma_pagamento == 'BOLETO'  ?
                                    <div className="row justify-content-center">
                                        <div className="col-md-12">
                                            <h5>
                                                Link do boleto:
                                            </h5>
                                            <p className="text-info">
                                                <button className={`btn btn-primary`} onClick={() => this.onGerarBoleto(dadosInscricao.inscricao[0].link_boleto)}>Gerar Boleto</button>
                                            </p>
                                        </div>
                                    </div>
                                : '' }
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <h5>
                                            Orientações
                                        </h5>
                                        <p className='text-danger'>
                                            * Caso efetou o pagamento, aguarde o prazo de até 48 horas para que sua inscrição seja efetivada.
                                        </p>
                                        <p className='text-danger'>
                                            * Não é possível alterar o forma de pagamento de inscrição após ter escolhido na etapa anterior.
                                        </p>
                                        <p className='text-danger'>
                                            * Caso desista, não precisa pagar o boleto que sua inscrição não será efetivada.
                                        </p>
                                        <p className='text-danger'>
                                            <strong>* Atenção ! Não estornamos valores pagos.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ acampUnidos: state.acampUnidos })

/**
 * @param {*} dispatch 
 */
// const mapDispatchToProps = dispatch => bindActionCreators({ removerAluno, buscarDadosForm, buscarAluno, alterarAluno, salvarAlunoLyceum }, dispatch);


export default connect(mapStateToProps, null )(PassoTres);