import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import Input from '../../components/form/input';

import Button from '../../components/form/button';

import Select from '../../components/form/select';

import { FORM_RULES, composeValidators, validateCpf } from '../../helpers/validations';

import { efetuarLogin, criarPessoa } from './actions';

import './style.css';

import { toastr } from 'react-redux-toastr';

class Cadastro extends Component {

    onSubmit = values => {
        if(values.senha == values.confirmarSenha){
            this.props.criarPessoa(values, this.props.history)
        }else{
            toastr.error('Erro', 'Senhas não conferem')
        }
    }

    onAuth = () => {
        this.props.history.push('/')
    }

    render() {

        const { auth } = this.props.auth

        console.log(auth)

        let dataSexo = [
            {id: 'm', name: 'Masculino'},
            {id: 'f', name: 'Feminino'}
        ]

        let dataCongregacao = [
            {id: '1', name: '602'},
        ]

        return (
            <div className="col-md-7 bg-white">
                <div className="row login-body justify-content-center">
                    <div className="col-md-8 pt-5">
                        <h1>
                            <p className="text-center">
                                Criar uma conta
                            </p> 
                        </h1>
                        <p className="text-center">
                            <small>Informe os dados abaixo</small>
                        </p>
                        <Form
                            onSubmit={this.onSubmit}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-12">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`nome_compl`} 
                                                label={`Nome:`}
                                                icon={`fa fa-user`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <Field 
                                                component={Input} 
                                                type={`email`}
                                                name={`email`} 
                                                label={`Email:`}
                                                icon={`fa fa-envelope`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.email)}
                                                />
                                        </div>
                                        <div className="col-md-6">
                                            <Field 
                                                component={Input} 
                                                type={`date`}
                                                name={`data_nascimento`} 
                                                label={`Data de nascimento:`}
                                                icon={`fa fa-calendar`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.max(11))}
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <Field 
                                                component={Select} 
                                                name={`sexo`} 
                                                data={dataSexo}
                                                label={`Sexo:`}
                                                validate={FORM_RULES.required}
                                                />
                                        </div>
                                        <div className="col-md-6">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`cpf`} 
                                                label={`CPF:`}
                                                icon={`fa fa-user`}
                                                maxLength={11}
                                                placeholder={`12345678978`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.number, FORM_RULES.max(11), validateCpf)}
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <Field 
                                                component={Input} 
                                                type={`phone`}
                                                name={`telefone`} 
                                                label={`Telefone:`}
                                                icon={`fa fa-phone`}
                                                maxLength={11}
                                                placeholder={`12345678912`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.max(11))}
                                                />
                                        </div>
                                        <div className="col-md-6">
                                            <Field 
                                                component={Select} 
                                                name={`congregacao`} 
                                                data={dataCongregacao}
                                                label={`Congregacao:`}
                                                icon={`fa fa-user`}
                                                validate={FORM_RULES.required}
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <Field 
                                                component={Input} 
                                                type={`password`}
                                                name={`senha`} 
                                                label={`Senha:`}
                                                icon={`fa fa-key`}
                                                placeholder={`Senha`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.max(8))}
                                                />
                                        </div>
                                        <div className="col-md-6">
                                            <Field 
                                                component={Input} 
                                                type={`password`}
                                                name={`confirmarSenha`} 
                                                label={`Confirmar Senha:`}
                                                icon={`fa fa-key`}
                                                placeholder={`Confirmar senha`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.max(8))}
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            {/* <label>&nbsp;</label> */}
                                            <Field
                                                component={Button}
                                                type={`submit`} 
                                                color={`btn-success`}
                                                icon={`fa fa-sign-in`} 
                                                // disabled={}
                                                description={`Confirmar`}
                                                />
                                        </div>
                                        <div className="col-md-6">
                                            <button type={`button`} 
                                                    className="btn btn-info col-md-12" 
                                                    onClick={() => this.onAuth()}>
                                                Já tenho uma conta
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}  
                        />
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ efetuarLogin, criarPessoa }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);