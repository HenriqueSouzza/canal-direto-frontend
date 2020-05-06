import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators, validateCpf } from '../../helpers/validations';

import MenuHeader from '../../components/menu/menuHeader';

import Button from '../../components/form/button';

import Input from '../../components/form/input';

import Select from '../../components/form/select';

import LoadingBody from '../../components/loading/loadingBody';

import { USER } from '../../config/const';

import { buscarDadosUsuario, alterarDadosUsuario } from './actions';


class MeusDados extends Component{

    componentDidMount(){
        this.props.buscarDadosUsuario(USER.pessoa)
    }
    
    onSubmit = values => {
        delete values.cpf
        this.props.alterarDadosUsuario(values, USER.pessoa, this.props.history)
    }
    
    
    render(){

        let { loading, dadosUsuario } = this.props.dadosCadastrais
        
        let dataSexo = [
            {id: 'm', name: 'Masculino'},
            {id: 'f', name: 'Feminino'}
        ]

        let dataCongregacao = [
            {id: '1', name: '602'},
        ]

        const initialValues = {
            nome_compl: dadosUsuario ? dadosUsuario.nome_compl : '',
            email: dadosUsuario ? dadosUsuario.email : '',
            cpf: dadosUsuario ? dadosUsuario.cpf : '',
            data_nascimento: dadosUsuario ? dadosUsuario.data_nascimento : '',
            sexo: dadosUsuario ? dadosUsuario.sexo : '',
            telefone: dadosUsuario ? dadosUsuario.telefone : '',
            congregacao: dadosUsuario ? dadosUsuario.congregacao : '',
        }

        return(
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Meus Dados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                initialValues={initialValues}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`nome_compl`} 
                                                    label={`Nome:`}
                                                    icon={`fa fa-user`}
                                                    placeholder={`Nome completo`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`email`}
                                                    name={`email`} 
                                                    label={`Email:`}
                                                    icon={`fa fa-envelope`}
                                                    placeholder={`email@email.com`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.email)}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`cpf`} 
                                                    label={`CPF:`}
                                                    icon={`fa fa-user`}
                                                    readOnly={true}
                                                    maxLength={11}
                                                    placeholder={`12345678978`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.number, FORM_RULES.max(11), validateCpf)}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    name={`data_nascimento`} 
                                                    label={`Data de nascimento:`}
                                                    icon={`fa fa-calendar`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.max(11))}
                                                    />
                                            </div>
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`sexo`} 
                                                    data={dataSexo}
                                                    label={`Sexo:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-4">
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
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
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
                                            <div className="col-md-3">
                                                {/* <label>&nbsp;</label> */}
                                                <Field
                                                    component={Button}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    icon={`fa fa-sign-in`} 
                                                    description={`Alterar`}
                                                    />
                                            </div>
                                        </div>
                                    </form>
                                )}/>
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
const mapStateToProps = state => ({ dadosCadastrais: state.dadosCadastrais })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosUsuario, alterarDadosUsuario }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(MeusDados);