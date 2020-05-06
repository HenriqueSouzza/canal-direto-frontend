import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import MenuHeader from '../../components/menu/menuHeader';

import Button from '../../components/form/button';

import Input from '../../components/form/input';

import LoadingBody from '../../components/loading/loadingBody';

import { alterarSenha } from './actions';

import { toastr } from 'react-redux-toastr';

import { USER } from '../../config/const';

class AlterarSenha extends Component{

    onSubmit = values => {
        if(values.senha == values.confirmarSenha){
            delete values.confirmarSenha;
            this.props.alterarSenha(values, USER, this.props.history)
        }else{
            toastr.error('Erro', 'Senhas não conferem')
        }
    }

    render(){

        let { loading } = this.props.dadosCadastrais
        
        if(loading){
            return <LoadingBody />
        }

        return(
            <section className="content">
                <MenuHeader title={`Alterar Senha`} history={this.props.location.pathname} />
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
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(8))}
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
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(8))}
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
const mapDispatchToProps = dispatch => bindActionCreators({ alterarSenha }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(AlterarSenha);