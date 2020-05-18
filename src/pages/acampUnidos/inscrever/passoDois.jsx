import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import LoadingBody from '../../../components/loading/loadingBody';

import { buscarDadosEvento } from './actions';

import Select from '../../../components/form/select';

// import { DirectPayment } from 'pagseguro-react';


class PassoDois extends Component{

    constructor(props){
        super(props)
        // if(props.dadosCadastrais.dadosUsuario.length <= 0){
        //     this.props.onClickPasso({passoAtual: '1'})
        // }
        this.state = {
            formPag: ""    
        }
    }

    onClickFormPag = values => {
        this.setState({formPag: values})
    }

    onBlurForm = (name,params) => {
        if(name == 'cep'){
            
        }
        console.log(name, params);
    }

    onError = values => {
        console.log(values)
    }

    onSubmit = values => {
        console.log(values)
    }

    render(){

        let { loading, dadosUsuario } = this.props.dadosCadastrais

        let initialValues = {
            cpf: dadosUsuario ? dadosUsuario.cpf : ''
        }

        let dataEstado = [
            {id: 'DF', name: 'Distrito Federal'},
        ]

        return(
            <div className="content-fluid">
                <LoadingBody status={loading} />
                <div className="text-left w-90">
                    <div className="bg-secondary rounded text-center">
                        <h4>Forma de pagamento</h4>
                    </div>
                    <div className="row justify-content-center mb-3 mt-3">
                        <div className="col-md-4 text-center">
                            <button 
                                    onClick={() => this.onClickFormPag('boleto')} 
                                    className={this.state.formPag == 'boleto' ? 'btn btn-info col-md-6' : 'btn btn-light col-md-6'}>Boleto</button>
                        </div>
                        <div className="col-md-4 text-center">
                            <button 
                                    onClick={() => this.onClickFormPag('cardCredito')} 
                                    className={this.state.formPag == 'cardCredito' ? 'btn btn-info col-md-6' : 'btn btn-light col-md-6'}>Cartão de crédito</button>
                        </div>
                        <div className="col-md-4 text-center">
                            <button 
                                    onClick={() => this.onClickFormPag('cardDebito')} 
                                    className={this.state.formPag == 'cardDebito' ? 'btn btn-info col-md-6' : 'btn btn-light col-md-6'}>Cartão de débito</button>
                        </div>
                    </div>
                    <div className="bg-secondary rounded text-center">
                        <h4>Endereço de cobrança</h4>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <Form
                            onSubmit={this.onSubmit}
                            initialValues={initialValues}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit} onBlur={(e) => this.onBlurForm(e.target.name, e.target.value)}>
                                    <div className="row">
                                        <Field 
                                            component="input"
                                            type={`hidden`}
                                            name={`cpf`} 
                                            label={`CPF:`}
                                            placeholder={`12345678978`}
                                            // validate={composeValidators(FORM_RULES.required, FORM_RULES.number, FORM_RULES.max(11), validateCpf)}
                                            />
                                        <div className="col-md-4">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`cep`} 
                                                label={`CEP:`}
                                                maxLength={8}
                                                // icon={`fa fa-user`}
                                                placeholder={`Nome completo`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                />
                                        </div>
                                        <div className="col-md-4">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`endereco`} 
                                                label={`Endereço:`}
                                                // icon={`fa fa-envelope`}
                                                placeholder={`Av. ponte alta`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.email)}
                                                />
                                        </div>
                                        <div className="col-md-2">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`numero`} 
                                                label={`Numero:`}
                                                // icon={`fa fa-user`}
                                                placeholder={`22`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                />
                                        </div>
                                        <div className="col-md-2">
                                            <Field 
                                                component={Select} 
                                                name={`estado`} 
                                                data={dataEstado}
                                                label={`Estado:`}
                                                validate={FORM_RULES.required}
                                                />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`complemento`} 
                                                label={`Complemento:`}
                                                // icon={`fa fa-envelope`}
                                                placeholder={`Apto.,Casa, Quadra`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.email)}
                                                />
                                        </div>
                                        <div className="col-md-4">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`bairro`} 
                                                label={`Bairro:`}
                                                // icon={`fa fa-envelope`}
                                                placeholder={`Sol nascente`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.email)}
                                                />
                                        </div>
                                        <div className="col-md-4">
                                            <Field 
                                                component={Input} 
                                                type={`text`}
                                                name={`cidade`} 
                                                label={`Cidade:`}
                                                // icon={`fa fa-envelope`}
                                                placeholder={`Samambaia`}
                                                validate={composeValidators(FORM_RULES.required, FORM_RULES.email)}
                                                />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-5">
                                        <div className="col-md-6 text-center">
                                            <button 
                                                    className="btn btn-danger col-md-6" 
                                                    onClick={() => this.props.onClickPasso({passoAtual: '1'})}>Voltar</button>
                                        </div>
                                        <div className="col-md-3">
                                            {/* <label>&nbsp;</label> */}
                                            <Field
                                                component={Button}
                                                type={`submit`} 
                                                color={`btn-success`}
                                                icon={`fa fa-sign-in`} 
                                                description={`Confirmar`}
                                                />
                                        </div>
                                    </div>  
                                </form>
                            )}/>
                    </div>
                </div>
            </div>
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosEvento }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(PassoDois);