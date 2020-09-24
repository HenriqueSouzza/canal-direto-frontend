import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import Select from '../../../components/form/select';

import Checkbox from '../../../components/form/checkbox';

import { alterarCampoForm, buscarCamposFormularios } from './actions';

class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarCamposFormularios('?where[id]=' + this.props.match.params.id)
    }

    onSubmit = values => {
        this.props.alterarCampoForm(values, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, camposFormularios } = this.props.padroesAcessos

        const dataName = [
            { id: 'setor', name: 'Setor' },
            { id: 'categoria', name: 'Categoria' },
            { id: 'assunto', name: 'assunto' },
            { id: 'mensagem', name: 'Mensagem' },
            { id: 'arquivo', name: 'Arquivo' },
        ]

        const dataTipo = [
            { id: 'text', name: 'Text' },
            { id: 'textarea', name: 'Textarea' },
            { id: 'select', name: 'Select' },
            { id: 'file', name: 'File' },
        ]

        
        let initialValues = {}

        if(camposFormularios.response){

            initialValues.name = camposFormularios.response.content[0].name
            initialValues.type = camposFormularios.response.content[0].type
            initialValues.campo_id = camposFormularios.response.content[0].campo_id
            initialValues.label = camposFormularios.response.content[0].label
            initialValues.value = camposFormularios.response.content[0].value
            initialValues.descricao = camposFormularios.response.content[0].descricao
            initialValues.icon = camposFormularios.response.content[0].icon
            initialValues.obrigatorio_temp = camposFormularios.response.content[0].obrigatorio
            initialValues.visivel_temp = camposFormularios.response.content[0].visivel
            initialValues.editavel_temp = camposFormularios.response.content[0].editavel

            dataTipo.map( (row, index) => {
                if(camposFormularios.response.content[0].type == row.id){
                    delete dataTipo[index]
                }
            })

        }

        return(
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Detalhe do formulário`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={initialValues}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Dados do input</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Select} 
                                                    name={`name`}
                                                    data={dataName}  
                                                    label={`Name campo:`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Select}
                                                    data={dataTipo} 
                                                    name={`type`} 
                                                    label={`Tipo do campo:`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`campo_id`} 
                                                    label={`Id campo:`}
                                                    placeholder={`exemplo: assunto_id, mensagem_id...`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`label`} 
                                                    label={`Label:`}
                                                    placeholder={`Escreva um apelido para o input...`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`value`} 
                                                    label={`Valor default:`}
                                                    placeholder={`Digite para o que será utilizado`}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`descricao`} 
                                                    label={`Descrição:`}
                                                    placeholder={`breve descrição para que serve esse input..`}
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`icon`} 
                                                    label={`Icone:`}
                                                    placeholder={`fa fa-user, fa fa-edit...`}
                                                    validate={composeValidators(FORM_RULES.max(100))}
                                                    />
                                            </div>
                                            <div className="col-md-12">
                                                <Field 
                                                    component={Checkbox} 
                                                    type={`checkbox`}
                                                    name={`obrigatorio_temp`} 
                                                    label={`Obrigatório:`}
                                                    />
                                                <Field 
                                                    component={Checkbox} 
                                                    type={`checkbox`}
                                                    name={`visivel_temp`} 
                                                    label={`Visível:`}
                                                    />
                                                <Field 
                                                    component={Checkbox} 
                                                    type={`checkbox`}
                                                    name={`editavel_temp`} 
                                                    label={`Editável:`}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Button} 
                                                    type={`button`}
                                                    onClick={() => this.onVoltar()}
                                                    color={`btn-dark`}
                                                    icon={`fa fa-arrow-left`}
                                                    description={`Voltar`}
                                                    />
                                            </div>
                                            <div className="col-md-4">
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
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarCampoForm, buscarCamposFormularios }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);
