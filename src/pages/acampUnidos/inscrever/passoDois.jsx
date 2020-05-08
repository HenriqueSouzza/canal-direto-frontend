import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

class PassoDois extends Component{

    render(){
        return(
            <div className="content-fluid">
                <div className="text-left w-90">
                    <div className="bg-secondary rounded text-center">
                        <h4>Dados do evento</h4>
                    </div>
                    <br/>
                    <div className="row justify-content-center m-2">
                        <div className="col-md-3">
                            <h5>
                                Evento:
                            </h5>
                        </div>
                        <div className="col-md-3">
                            <h5>
                                Local:
                            </h5>
                        </div>
                        <div className="col-md-3">
                            <h5>
                                Cidade:
                            </h5>
                        </div>
                    </div>
                    <br/>
                    <div className="row justify-content-center m-2">
                        <div className="col-md-3">
                            <h5>
                                Valor:
                            </h5>
                        </div>
                        <div className="col-md-3">
                            <h5>
                                Data:
                            </h5>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                    <br/>
                    <div className="bg-secondary rounded text-center">
                        <h4>Forma de pagamento</h4>
                    </div>
                    <div className="row justify-content-center mb-5">

                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <button className="btn btn-danger" onClick={() => this.props.onClickPasso({passoAtual: '1'})}>Voltar</button>
                        </div>
                        <div className="col-md-6 text-center">
                            <button className="btn btn-success" onClick={() => this.props.onClickPasso({passoAtual: '3'})}>Proximo</button>
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
// const mapStateToProps = state => ({ alunos: state.atvAlunos })

/**
 * @param {*} dispatch 
 */
// const mapDispatchToProps = dispatch => bindActionCreators({ removerAluno, buscarDadosForm, buscarAluno, alterarAluno, salvarAlunoLyceum }, dispatch);


export default connect(null, null )(PassoDois);