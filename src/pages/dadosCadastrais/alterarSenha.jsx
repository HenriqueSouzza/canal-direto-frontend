import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import MenuHeader from '../../components/menu/menuHeader';

import Button from '../../components/form/button';

import Input from '../../components/form/input';


class AlterarSenha extends Component{

    onSubmit = values => {

    }

    render(){

        return(
            <section className="content">
                <MenuHeader title={`Meus Dados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`password`}
                                                    name={`senha`} 
                                                    label={`Nova Senha:`}
                                                    maxLength={8}
                                                    icon={`fa fa-key`}
                                                    placeholder={`Digite sua nova senha`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.max(8))}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`password`}
                                                    name={`confirmarSenha`} 
                                                    label={`Confirmar nova senha:`}
                                                    maxLength={8}
                                                    icon={`fa fa-key`}
                                                    placeholder={`Confirmar senha`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.max(8))}
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
const mapStateToProps = state => ({ auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(AlterarSenha);