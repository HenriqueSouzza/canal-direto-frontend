import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import Input from '../../components/form/input';

import Button from '../../components/form/button';

import LoadingBody from '../../components/loading/loadingBody';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import Radio from '../../components/form/radio';

import { efetuarLogin } from './actions';

import './style.css';

import imgLogo  from '../../template/images/logo.png';


class Auth extends Component {

    onSubmit = values => {
        this.props.efetuarLogin(values)
    }

    render() {

        let { loading } = this.props.auth
        
        return (
                <div className="col-md-7 bg-white">
                    <LoadingBody status={loading} />
                    <div className="row login-body justify-content-center">
                        <div className="col-md-8 align-self-center">
                            <div className="logoMobile">
                                <div className="text-center mb-4">
                                    <img src={imgLogo} style={{width: '50px'}} className="brand-image img-logo img-circle elevation-3" alt={`LogoImage`} />
                                </div>
                            </div>
                            <h1>
                                <p className="text-center">
                                    Acessar
                                </p> 
                            </h1>
                            <p className="text-center">
                                <small>Informe seu login e senha para acessar</small>
                            </p>
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row justify-content-center">
                                            <div className="col-md-10">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`login`} 
                                                    label={`Login:`}
                                                    icon={`fa fa-user`}
                                                    placeholder={`login`}
                                                    autoComplete={`username`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                                <Field 
                                                    component={Input} 
                                                    type={`password`}
                                                    name={`password`} 
                                                    label={`Senha:`}
                                                    icon={`fa fa-key`}
                                                    placeholder={`********`}
                                                    autoComplete={`current-password`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <Field 
                                                        component={Radio} 
                                                        type={`radio`}
                                                        name={`tipo`} 
                                                        label={`Aluno`}
                                                        value={`1`}
                                                        validate={composeValidators(FORM_RULES.required)}
                                                        />
                                                    <Field 
                                                        component={Radio} 
                                                        type={`radio`}
                                                        name={`tipo`} 
                                                        label={`Docente`}
                                                        value={`2`}
                                                        />
                                                    <Field 
                                                        component={Radio} 
                                                        type={`radio`}
                                                        name={`tipo`} 
                                                        label={`Funcionário`}
                                                        value={`3`}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-8">
                                                <Field
                                                    component={Button}
                                                    name={`sendAuth`}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    icon={`fa fa-sign-in`} 
                                                    description={`Entrar`}
                                                    />
                                            </div>
                                        </div>
                                        {/* <div className="row justify-content-center">
                                            <div className="col-md-8 text-center">
                                                <Link to={`/esqueci-senha`}> 
                                                    Esqueci minha senha
                                                </Link>
                                            </div>
                                        </div> */}
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
const mapDispatchToProps = dispatch => bindActionCreators({ efetuarLogin }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Auth);