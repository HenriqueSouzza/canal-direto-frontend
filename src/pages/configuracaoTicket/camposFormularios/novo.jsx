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

import { novoCampoForm } from './actions';
import { data } from 'jquery';

class Novo extends Component{

    constructor(props){
        super(props)

        if(this.props.configuracaoTicket.camposFormularios.length <= 0){
            this.props.history.goBack()
        }
    }

    onSubmit = values => {
        values.obrigatorio = values.obrigatorio_temp ? 1 : 0
        values.visivel = values.visivel_temp ? 1  : 0
        values.editavel = values.editavel_temp ? 1  : 0

        this.props.novoCampoForm(values, this.props.history)
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

        if(camposFormularios.response){
            if(Array.isArray(camposFormularios.response.content)){
                camposFormularios.response.content.find(element => {
                    dataName.map( (row, index) => {
                        if(element.name == row.id){
                            delete dataName[index]
                        }
                    })
                 })
            }else{
                dataName.map( (row, index) => {
                    if(row.name == camposFormularios.response.content.name){
                        delete dataName[index]
                    }
                })
            }
        }

        const dataTipo = [
            { id: 'text', name: 'Text' },
            { id: 'textarea', name: 'Textarea' },
            { id: 'select', name: 'Select' },
            { id: 'file', name: 'File' },
        ] 

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
const mapDispatchToProps = dispatch => bindActionCreators({ novoCampoForm }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);
