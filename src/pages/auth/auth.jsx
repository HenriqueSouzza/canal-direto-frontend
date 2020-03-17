import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import Input from '../../components/form/input';

import Button from '../../components/form/button';

import imgLogo  from '../../uploads/logo.png';

import { FORM_RULES } from '../../helpers/validations';

import { efetuarLogin } from './actions';

import './style.css';

class Auth extends Component{

    onSubmit = values => {
        console.log(values)
        this.props.efetuarLogin(values, this.props.history)
    }

    render(){

        return(
            <div className="container-fluid login-background">
                <div className="login-body">
                    <div className="row justify-content-center">
                        <div className="login-logo">
                            <img src={imgLogo} className="brand-image img-logo img-circle elevation-3" alt={`LogoImage`}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="login-box">
                            <div className="card shadow p-3 mb-5 bg-white rounded">
                                <div className="card-body text-center">
                                    <p>
                                        <small>Informe seu login e senha para acessar</small>
                                    </p>
                                    <Form
                                        onSubmit={this.onSubmit}
                                        render={({handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`login`} 
                                                            label={`Login:`}
                                                            icon={`fa fa-user`}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Field 
                                                            component={Input} 
                                                            type={`password`}
                                                            name={`password`} 
                                                            label={`Senha:`}
                                                            icon={`fa fa-key`}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        {/* <label>&nbsp;</label> */}
                                                        <Field
                                                            component={Button}
                                                            type={`submit`} 
                                                            color={`btn-info`}
                                                            icon={`fa fa-sign-in`} 
                                                            description={`Entrar`}
                                                            />
                                                    </div>
                                                </div>
                                            </form>
                                        )}  
                                    />
                                </div>
                            </div>
                        </div>
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


export default connect(mapStateToProps, mapDispatchToProps )(Auth);