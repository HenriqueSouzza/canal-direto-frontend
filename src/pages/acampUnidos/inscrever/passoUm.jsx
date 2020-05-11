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

import { alterarDadosUsuario, buscarDadosUsuario, buscarCongregacoes } from '../../dadosCadastrais/actions';

import { buscarDadosEvento } from './actions';
import LoadingBody from '../../../components/loading/loadingBody';

class PassoUm extends Component{

    componentDidMount(){
        this.props.buscarDadosEvento(1);
        this.props.buscarDadosUsuario(USER.pessoa)
        this.props.buscarCongregacoes()
    }

    render(){

        let { loading, dadosUsuario, congregacao } = this.props.dadosCadastrais

        let { dadosEvento } = this.props.acampUnidos

        let dadosCongregacao = ''
        
        if(congregacao.length > 0){
            dadosCongregacao = congregacao.find(row => (row.congregacao == dadosUsuario.congregacao))
        }

        return(
            <div className="text-left">
                <LoadingBody status={loading} />
                <div className="bg-secondary rounded text-center">
                    <h4>Dados Pessoais</h4>
                </div>
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <h5> Nome completo: </h5>
                                    <p className="text-info">
                                        <strong>{dadosUsuario ? dadosUsuario.nome_compl : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5> Email: </h5>
                                    <p className="text-info">
                                        <strong>{dadosUsuario ? dadosUsuario.email : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5> CPF: </h5>
                                    <p className="text-info">
                                        <strong>{dadosUsuario ? dadosUsuario.cpf : 'Não divulgado'}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5> Data de Nascimento: </h5>
                                    <p className="text-info">
                                        <strong>{dadosUsuario ? dadosUsuario.data_nascimento : ''}</strong>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <h5> Data: </h5>
                                    <p className="text-info">
                                        <strong>{dadosUsuario ? dadosUsuario.sexo == 'm' ? 'masculino' : 'feminino' : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5> Telefone: </h5>
                                    <p className="text-info">
                                        <strong>{dadosUsuario ? dadosUsuario.telefone : ''}</strong>
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <h5> Congregacao: </h5>
                                    <p className="text-info">
                                        <strong>{dadosCongregacao ? dadosCongregacao.nome_congregacao : ''}</strong>
                                    </p>
                                </div>
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
const mapStateToProps = state => ({ dadosCadastrais: state.dadosCadastrais, acampUnidos: state.acampUnidos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarDadosUsuario, buscarDadosUsuario, buscarDadosEvento, buscarCongregacoes }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(PassoUm);