import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators, validateCpf } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import Input from '../../../components/form/input';

import Select from '../../../components/form/select';

import Button from '../../../components/form/button';

import { USER } from '../../../config/const';

import LoadingBody from '../../../components/loading/loadingBody';

class PassoUm extends Component{

    render(){

        let { loading, dadosInscricao } = this.props.acampUnidos

        console.log(dadosInscricao);
        // let dadosCongregacao = ''
        
        // if(congregacao.length > 0){
        //     dadosCongregacao = congregacao.find(row => (row.congregacao == dadosUsuario.congregacao))
        // }

        return(
            <div className="text-left">
                <LoadingBody status={loading} />
                <div className="bg-secondary rounded text-center">
                    <h4>Dados Pessoais</h4>
                </div>
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <h5> Nome completo: </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.nome_compl : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5> Email: </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.email : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5> CPF: </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.cpf : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <h5> Data de Nascimento: </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.data_nascimento : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5> Sexo: </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.sexo == 'm' ? 'masculino' : 'feminino' : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5> Telefone: </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao.pessoa ? dadosInscricao.pessoa.telefone : ''}</strong>
                                    </p>
                                </div>
                                {/* <div className="col-md-3">
                                    <h5> Congregacao: </h5>
                                    <p className="text-info">
                                        <strong>{dadosCongregacao ? dadosCongregacao.nome_congregacao : ''}</strong>
                                    </p>
                                </div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="text-danger">* Para alterar seus dados vai em (Dados cadastrais > Meus dados)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-secondary rounded text-center">
                    <h4>Dados do evento</h4>
                </div>
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-2">
                                    <h5>
                                        Evento:
                                    </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.nome_evento != null ? dadosInscricao.evento.nome_evento : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5>
                                        Local:
                                    </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.local != null ? dadosInscricao.evento.local : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5>
                                        Cidade:
                                    </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.cidade != null ? dadosInscricao.evento.cidade + '-' + dadosInscricao.evento.estado : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                                <div className="col-md-2">
                                    <h5>
                                        Valor:
                                    </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.valor != null ? 'R$ '+ dadosInscricao.evento.valor : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                                <div className="col-md-2">
                                    <h5>
                                        Data:
                                    </h5>
                                    <p className="text-info">
                                        <strong>{dadosInscricao && dadosInscricao.evento && dadosInscricao.evento.data != null ? dadosInscricao.evento.data : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button className="btn btn-success col-md-4" onClick={() => this.props.onClickPasso({passoAtual: '2'})}>Avançar</button>
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
// const mapDispatchToProps = dispatch => bindActionCreators({ alterarDadosUsuario, buscarDadosUsuario, buscarDadosEvento, buscarCongregacoes }, dispatch);


export default connect(mapStateToProps, null )(PassoUm);