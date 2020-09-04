import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import Checkbox from '../../../components/form/checkbox';

class Novo extends Component{

    onSubmit = values => {
        console.log(values)
    }

    render(){

        const { loading } = this.props.configuracaoTicket

        console.log();

        return(
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Novo formulário`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Dados do formulário</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`nome`} 
                                                    label={`Nome do formulário:`}
                                                    icon={`fa fa-file`}
                                                    placeholder={`Digite o nome do formulário`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`descricao`} 
                                                    label={`Descrição:`}
                                                    icon={`fa fa-align-justify`}
                                                    placeholder={`Digite para o que será utilizado`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Informe os campos que terão no formulário</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Checkbox} 
                                                    name={`assunto`} 
                                                    label={`Assunto:`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-5">
                                                <Field 
                                                    component={Button} 
                                                    type={`submit`}
                                                    color={`btn-success`}
                                                    icon={`fa fa-save`}
                                                    description={`Salvar`}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    )}/>
                </div>
            </section>
        )
    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ configuracaoTicket: state.configuracaoTicket })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);
