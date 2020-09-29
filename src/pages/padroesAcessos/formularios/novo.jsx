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

import { buscarCamposFormularios } from '../camposFormularios/actions';

import { novoFormulario } from './actions';

class Novo extends Component{

    componentDidMount(){
        this.props.buscarCamposFormularios()
    }

    onSubmit = values => {
        values.id_campos = Object.keys(values.camposForm_temp)
        this.props.novoFormulario(values, this.props.history)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, camposFormularios } = this.props.padroesAcessos

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
                                {
                                    camposFormularios.response ?
                                        <div className="card card-danger">
                                            <div className="card-header">
                                                <h3 className="card-title">Informe os campos que terão no formulário</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    {camposFormularios.response.content.map((row,index) => (
                                                        <div className="col-md-6" key={index}>
                                                            <Field 
                                                                component={Checkbox} 
                                                                type={`checkbox`}
                                                                name={`camposForm_temp[${row.id}]`} 
                                                                label={row.label}
                                                                />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-5">
                                                        <Field 
                                                            component={Button} 
                                                            type={`button`}
                                                            color={`btn-dark`}
                                                            onClick={() => this.onVoltar()}
                                                            icon={`fa fa-arrow-left`}
                                                            description={`Voltar`}
                                                            />
                                                    </div>
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
                                    :
                                        ''
                                }
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarCamposFormularios, novoFormulario }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);
