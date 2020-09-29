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

import  { cadastrarSetor } from './actions'

class Novo extends Component{

    onSubmit = values => {

        const params = {}

        params.ativo = values.ativo ? 1 : 0
        params.descricao = values.descricao

        this.props.cadastrarSetor(params, this.props.history)

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
                                            <h3 className="card-title">Dados do Setor</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`descricao`} 
                                                        label={`Nome do setor:`}
                                                        icon={`fa fa-id-badge`}
                                                        placeholder={`nome do setor`}
                                                        validate={composeValidators(FORM_RULES.required)}
                                                        />
                                                </div>                                                                                                      
                                                <div className="col-md-4 text-center">
                                                    <div className="">&nbsp;</div>
                                                    <Field 
                                                        component={Checkbox} 
                                                        type={`checkbox`}
                                                        name={`ativo`} 
                                                        label={`Ativo`}
                                                        />
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-3">
                                                    <Field
                                                        component={Button}
                                                        type={`button`} 
                                                        name={`btn-button`}
                                                        color={`btn-dark`}
                                                        onClick={() => this.onVoltar()}
                                                        icon={`fa fa-arrow-left`} 
                                                        description={`Voltar`}
                                                        />
                                                </div>
                                                <div className="col-md-3">
                                                    <Field
                                                        component={Button}
                                                        name={`sendDados`}
                                                        type={`submit`} 
                                                        color={`btn-success`}
                                                        icon={`fa fa-sign-in`} 
                                                        description={`Cadastrar`}
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
const mapDispatchToProps = dispatch => bindActionCreators({ cadastrarSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);