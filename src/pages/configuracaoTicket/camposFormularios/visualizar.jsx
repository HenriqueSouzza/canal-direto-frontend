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

import { alterarCampoForm } from './actions';

class Visualizar extends Component{

    constructor(props){
        super(props)

        if(this.props.configuracaoTicket.camposFormularios.length <= 0){
            this.props.history.goBack()
        }
    }

    onSubmit = values => {
        this.props.alterarCampoForm(values, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, camposFormularios } = this.props.configuracaoTicket

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

        
        const initialValues = {}

        if(camposFormularios.response){
            if(Array.isArray(camposFormularios.response.content)){
                camposFormularios.response.content.find(element => {
                    if(element.id == this.props.match.params.id){
                        initialValues.name = element.name
                        initialValues.type = element.type
                        initialValues.campo_id = element.campo_id
                        initialValues.label = element.label
                        initialValues.value = element.value
                        initialValues.descricao = element.descricao
                        initialValues.icon = element.icon
                        initialValues.obrigatorio_temp = element.obrigatorio
                        initialValues.visivel_temp = element.visivel
                        initialValues.editavel_temp = element.editavel

                        dataTipo.map( (row, index) => {
                            if(element.type == row.id){
                                delete dataTipo[index]
                            }
                        })
                    }
                })
            }else{
                if(camposFormularios.response.content.id == this.props.match.params.id){
                    initialValues.name = camposFormularios.response.content.name
                    initialValues.type = camposFormularios.response.content.type
                    initialValues.campo_id = camposFormularios.response.content.campo_id
                    initialValues.label = camposFormularios.response.content.label
                    initialValues.value = camposFormularios.response.content.value
                    initialValues.descricao = camposFormularios.response.content.descricao
                    initialValues.icon = camposFormularios.response.content.icon
                    initialValues.obrigatorio_temp = camposFormularios.response.content.obrigatorio
                    initialValues.visivel_temp = camposFormularios.response.content.visivel
                    initialValues.editavel_temp = camposFormularios.response.content.editavel
                    dataTipo.map( (row, index) => {
                        if(row.type == camposFormularios.response.content.type){
                            delete dataTipo[index]
                        }
                    })
                }
            }
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
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
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
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`label`} 
                                                    label={`Label:`}
                                                    placeholder={`Escreva um apelido para o input...`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
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
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`icon`} 
                                                    label={`Icone:`}
                                                    placeholder={`fa fa-user, fa fa-edit...`}
                                                    validate={composeValidators(FORM_RULES.max(5))}
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
const mapStateToProps = state => ({ configuracaoTicket: state.configuracaoTicket })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarCampoForm }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);
