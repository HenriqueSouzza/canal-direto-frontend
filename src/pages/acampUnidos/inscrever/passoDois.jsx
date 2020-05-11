import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { buscarDadosEvento } from './actions';

import LoadingBody from '../../../components/loading/loadingBody';

class PassoDois extends Component{

    componentDidMount(){
        this.props.buscarDadosEvento(1);
    }

    render(){

        let { dadosEvento, loading } = this.props.acampUnidos

        return(
            <div className="content-fluid">
                <LoadingBody status={loading} />
                <div className="text-left w-90">
                    <div className="bg-secondary rounded text-center">
                        <h4>Dados do evento</h4>
                    </div>
                    <br/>
                    <div className="row justify-content-center mt-2">
                        <div className="col-md-2">
                            <h5>
                                Evento:
                            </h5>
                            <p className="text-info">
                                <strong>{dadosEvento && dadosEvento.nome_evento != null ? dadosEvento.nome_evento : 'Não divulgado'}</strong>
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h5>
                                Local:
                            </h5>
                            <p className="text-info">
                                <strong>{dadosEvento && dadosEvento.local != null ? dadosEvento.local : 'Não divulgado'}</strong>
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h5>
                                Cidade:
                            </h5>
                            <p className="text-info">
                                <strong>{dadosEvento && dadosEvento.cidade != null ? dadosEvento.cidade + '-' + dadosEvento.estado : 'Não divulgado'}</strong>
                            </p>
                        </div>
                        <div className="col-md-2">
                            <h5>
                                Valor:
                            </h5>
                            <p className="text-info">
                                <strong>{dadosEvento && dadosEvento.valor != null ? 'R$ '+ dadosEvento.valor : 'Não divulgado'}</strong>
                            </p>
                        </div>
                        <div className="col-md-2">
                            <h5>
                                Data:
                            </h5>
                            <p className="text-info">
                                <strong>{dadosEvento && dadosEvento.data != null ? dadosEvento.data : 'Não divulgado'}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="bg-secondary rounded text-center">
                        <h4>Forma de pagamento</h4>
                    </div>
                    <div className="row justify-content-center mb-5">

                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <button className="btn btn-danger col-md-6" onClick={() => this.props.onClickPasso({passoAtual: '1'})}>Voltar</button>
                        </div>
                        <div className="col-md-6 text-center">
                            <button className="btn btn-success col-md-6" onClick={() => this.props.onClickPasso({passoAtual: '3'})}>Proximo</button>
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosEvento }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(PassoDois);