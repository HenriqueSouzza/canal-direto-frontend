import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Checkbox from '../../../components/form/checkbox';

import Button from '../../../components/form/button';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import  { cadastrarCategoria } from './actions'

class Novo extends Component{

    onSubmit = values => {
        const params = {}
        
        params.ativo = values.ativo ? 1 : 0
        params.descricao = values.descricao 
        params.setor = this.props.match.params.id
        params.permite_abertura_ticket = values.permite_abertura_ticket ? 1 : 0
        params.permite_interacao = values.permite_interacao ? 1 : 0
        params.permite_n_tickets_abertos = values.permite_n_tickets_abertos ? 1 : 0

        this.props.cadastrarCategoria(params, this.props.history)
    }

    /**
     * 
     */
    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading } = this.props.padroesAcessos

        const initialValues = { ativo: 1 }

        return(
                <section className="content">
                    <LoadingBody status={loading} />
                    <MenuHeader title={`Cadastrar Setor`} history={this.props.location.pathname} />
                    <div className="content-fluid">
                        <Form
                            onSubmit={this.onSubmit}
                            initialValues={initialValues}
                            render={({handleSubmit, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card card-danger">
                                        <div className="card-header">
                                            <h3 className="card-title">Dados da categoria</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`descricao`} 
                                                        label={`Nome do setor:`}
                                                        icon={`fa fa-id-badge`}
                                                        placeholder={`nome do setor`}
                                                        validate={composeValidators(FORM_RULES.required, FORM_RULES.max(150))}
                                                        />
                                                </div>                                                                                                      
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-5">
                                                    <Field 
                                                        component={Checkbox} 
                                                        type={`checkbox`}
                                                        name={`ativo`} 
                                                        label={`Ativo`}
                                                        />
                                                </div>
                                                <div className="col-md-5">
                                                    <Field 
                                                        component={Checkbox} 
                                                        type={`checkbox`}
                                                        name={`permite_abertura_ticket`} 
                                                        label={`permite abertura de tickets ?`}
                                                        />
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-5">
                                                    <Field 
                                                        component={Checkbox} 
                                                        type={`checkbox`}
                                                        name={`permite_interacao`} 
                                                        label={`permite interações ?`}
                                                        />
                                                </div>
                                                <div className="col-md-5">
                                                    <Field 
                                                        component={Checkbox} 
                                                        type={`checkbox`}
                                                        name={`permite_n_tickets_abertos`} 
                                                        label={`permite vários tickets abertos ?`}
                                                        />
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-3">
                                                    <Field
                                                        component={Button}
                                                        type={`button`} 
                                                        color={`btn-dark`}
                                                        onClick={() => this.onVoltar()}
                                                        icon={`fa fa-arrow-left`} 
                                                        description={`Voltar`}
                                                        />
                                                </div>
                                                <div className="col-md-3">
                                                    <Field
                                                        component={Button}
                                                        type={`submit`} 
                                                        color={`btn-success`}
                                                        icon={`fa fa-save`} 
                                                        description={`Adicionar`}
                                                        disabled={pristine}
                                                        />
                                                </div>                                                    
                                            </div>  
                                        </div>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </section>
            )   
        }
} 

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ cadastrarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);