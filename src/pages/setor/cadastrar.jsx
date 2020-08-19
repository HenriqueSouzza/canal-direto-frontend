import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import axios from 'axios';

import MenuHeader from '../../components/menu/menuHeader';

import LoadingBody from '../../components/loading/loadingBody';

import Input from '../../components/form/input';

import Checkbox from '../../components/form/checkbox';

import Button from '../../components/form/button';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import  { cadastrarSetor } from './actions'

class Cadastrar extends Component{

    onSubmit = values => {
        //console.log(values.ativo);

        values.ativo = (values.ativos ? "S" : "N");
        values.usuario = 'marcos.barroso';
        
        //console.log(values);

        this.props.cadastrarSetor(values, this.props.history)
    }

    render(){

        const initialValues = {}

        return(
                <>
                    <section className="content">
                        <LoadingBody status={false} />
                        <MenuHeader title={`Cadastrar Setor`} history={this.props.location.pathname} />
                            <div className="content-fluid">
                                <div className="card">
                                    <div className="card-body">
                                    <Form
                                        onSubmit={this.onSubmit}
                                        initialValues={initialValues}
                                        render={({handleSubmit,submitSucceeded,pristine}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`descricao`} 
                                                            label={`Descrição:`}
                                                            icon={`fa fa-id-badge`}
                                                            placeholder={`Descrição`}
                                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`ativos`} 
                                                            label={`Ativo`}
                                                            />
                                                    </div>                                                                                                      
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-3">
                                                        {/* <label>&nbsp;</label> */}
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
                                            </form>
                                        )}
                                    />
                                    </div>
                                </div>
                            </div>
                    </section>
                </>
            )   
        }
} 

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ setor: state.setor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ cadastrarSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Cadastrar);