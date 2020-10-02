import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import { novoStatusTicket } from './actions';


class Novo extends Component{

    onSubmit = values => {
        this.props.novoStatusTicket(values, this.props.history)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading } = this.props.padroesAcessos

        return(
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Novo Status`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="card card-danger">
                                    <div className="card-header">
                                        {/* <h3 className="card-title">Dados do Status</h3> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`nome`} 
                                                    label={`Nome:`}
                                                    icon={`fa fa-file`}
                                                    placeholder={`Digite o nome do status`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`descricao`} 
                                                    label={`Descrição:`}
                                                    icon={`fa fa-align-justify`}
                                                    placeholder={`Digite para o que será utilizado`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                                <Field 
                                                    component={Input} 
                                                    type={`number`}
                                                    name={`ordem`} 
                                                    label={`Ordem:`}
                                                    icon={`fa fa-arrow-up`}
                                                    placeholder={`Digite a ordem 1 ou 2 ou 3`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.number)}
                                                    />
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row justify-content-center">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Button} 
                                                    name={`btn-button`}
                                                    type={`button`}
                                                    onClick={() => this.onVoltar()}
                                                    color={`btn-dark`}
                                                    icon={`fa fa-arrow-left`}
                                                    description={`Voltar`}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Button} 
                                                    name={`btn-submit`}
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
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ novoStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);
