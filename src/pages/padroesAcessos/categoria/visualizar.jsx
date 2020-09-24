import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Checkbox from '../../../components/form/checkbox';

import Button from '../../../components/form/button';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import { buscarCategoria, alterarCategoria } from './actions';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarCategoria('?where[id]=' + this.props.match.params.id)
    }

    onSubmit = values => {
        const params = {}
        
        params.ativo = values.ativo ? 1 : 0
        params.descricao = values.descricao 
        params.permite_abertura_ticket = values.permite_abertura_ticket ? 1 : 0
        params.permite_interacao = values.permite_interacao ? 1 : 0
        params.permite_n_tickets_abertos = values.permite_n_tickets_abertos ? 1 : 0

        this.props.alterarCategoria(params, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack();
    }

    render(){

        const initialValues = {}

        const { loading, categoria } = this.props.padroesAcessos

        if(categoria.response){
            initialValues.descricao = categoria.response.content[0].descricao
            initialValues.ativo = categoria.response.content[0].ativo ? true : false
            initialValues.permite_abertura_ticket = categoria.response.content[0].permite_abertura_ticket ? true : false
            initialValues.permite_interacao = categoria.response.content[0].permite_interacao ? true : false
            initialValues.permite_n_tickets_abertos = categoria.response.content[0].permite_n_tickets_abertos ? true : false
        }
        
        return(
                <section className="content">
                    <LoadingBody status={loading} />
                    <MenuHeader title={`Adicionar nova categoria`} history={this.props.location.pathname} />
                    <div className="content-fluid">
                        <Form
                            onSubmit={this.onSubmit}
                            initialValues={initialValues}
                            render={({handleSubmit, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card card-danger">
                                        <div className="card-header">
                                            <h3 className="card-title">Dados do Setor</h3>
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
                                                        icon={`fa fa-sign-in`} 
                                                        description={`Alterar`}
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
const mapDispatchToProps = dispatch => bindActionCreators({ alterarCategoria, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);