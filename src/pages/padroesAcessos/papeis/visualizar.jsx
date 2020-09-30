import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FieldArray } from 'react-final-form-arrays';

import arrayMutators from 'final-form-arrays';  

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import SelectMultiple from '../../../components/form/selectMultiple';

import Select from '../../../components/form/select';

import { buscarPapeis, alterarPapel } from './actions';

import { buscarPermissoes } from '../permissoes/actions';



class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarPapeis('?where[id]=' + this.props.match.params.id)
        this.props.buscarPermissoes('?where[prefix]=api/canal-direto')
    }

    onSubmit = values => {
        const params = {}

        params.papel = values.papel
        params.descricao = values.descricao
        params.sistema = 1
        params.formulario = values.formulario

        if(values.permissoes){
            params.permissao = values.permissoes.map( row => (row.value))
        }else{
            params.permissao = []
        }

        this.props.alterarPapel(params, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, papeis, permissoes, formularios, categoria, setor } = this.props.padroesAcessos

        const initialValues = {}

        if(papeis.response){
            initialValues.papel = papeis.response.content[0].papel
            initialValues.descricao = papeis.response.content[0].descricao
            initialValues.sistema = papeis.response.content[0].sistemas.nome_sistema
            initialValues.formulario = papeis.response.content[0].formulario.id ? papeis.response.content[0].formulario.id : ''
            initialValues.permissoes = papeis.response.content[0].permissoes.map(row => ({value: row.id, label: row.permissao}))
            initialValues.setorCategoria = [{setor: 1, categoria: [{value: 1, label: 'teste'}]}]
        }

        let categoriaSelect = []

        if(categoria.response){
            categoriaSelect = categoria.response.content.map(row => ({ value: row.id, label: row.descricao }))
        }

        let setorSelect = []

        if(setor.response){
            setorSelect = setor.response.content.map(row => ({ id: row.id, name: row.descricao }))
        }

        let permissoesSelect = {}

        if(permissoes.response){
            permissoesSelect = permissoes.response.content.map(row => ({value: row.id, label: row.permissao}))
        }

        let formulariosSelect = []
        
        if(formularios.response){
            formulariosSelect = formularios.response.content.map(row => ({id: row.id, name: row.nome}))
        }

        return( 
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Detalhe do papel`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={initialValues}
                        mutators={{ ...arrayMutators }}
                        render={({
                                handleSubmit,
                                form: {
                                    mutators: { push, pop }
                                },
                            }) => (
                            <form onSubmit={handleSubmit}>

                                {/************************ PAPEIS ************************
                                **********************************************************/}

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
                                                    name={`papel`} 
                                                    label={`Papel:`}
                                                    icon={`fa fa-file`}
                                                    placeholder={`Digite o nome do papel`}
                                                    validate={composeValidators(FORM_RULES.required)}
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
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`sistema`} 
                                                    label={`Sistema:`}
                                                    icon={`fa fa-align-justify`}
                                                    disabled={true}
                                                    placeholder={`Digite para o que será utilizado`}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field
                                                    component={Select}
                                                    name={`formulario`}
                                                    label={`Formulário`}
                                                    data={formulariosSelect}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/************************ SETORES E CATEGORIAS ************************
                                ***********************************************************************/}

                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Informe os setores e categorias</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12">
                                                <FieldArray name="setorCategoria">
                                                    {({ fields }) =>
                                                        fields.map((name, index) => (
                                                        <div className="row justify-content-center border-bottom mb-2" key={name}>
                                                            <div className="col-md-4">
                                                                <Field
                                                                    component={Select}
                                                                    name={`${name}.setor`}
                                                                    label={`Setor`}
                                                                    data={setorSelect}
                                                                    />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <Field
                                                                    component={SelectMultiple}
                                                                    name={`${name}.categoria`}
                                                                    label={`Categoria`}
                                                                    options={categoriaSelect}
                                                                    isMulti
                                                                    closeMenu={false}
                                                                    multiple
                                                                    />
                                                            </div>
                                                            <div className="col-md-1">
                                                                <label>&nbsp;</label>
                                                                <Button 
                                                                    type={`button`}
                                                                    onClick={() => fields.remove(index)}
                                                                    icon={`fa fa-trash`}
                                                                    color={`btn-dark`}
                                                                />
                                                            </div>
                                                        </div>
                                                        ))
                                                    }
                                                </FieldArray>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-2">
                                                <Button
                                                    type={`button`}
                                                    description={`Adicionar`}
                                                    color={`btn-primary`}
                                                    name={`btn-adicionar`}
                                                    icon={`fa fa-plus`}
                                                    onClick={() => push('setorCategoria', undefined)}
                                                    />
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <small className="text-danger"> 
                                                    <b>* Só será enviado se o setor e a categoria estiver preenchido</b>
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/************************ PERMISSOES ************************
                                **********************************************************/}

                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Informe as permissões desse papel</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12">
                                                <Field
                                                    component={SelectMultiple}
                                                    name={`permissoes`}
                                                    options={permissoesSelect}
                                                    isMulti
                                                    closeMenu={false}
                                                    multiple
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-md-3">
                                        <Field 
                                            component={Button} 
                                            type={`button`}
                                            name={`btn-button`}
                                            color={`btn-dark`}
                                            onClick={() => this.onVoltar()}
                                            icon={`fa fa-arrow-left`}
                                            description={`Voltar`}
                                            />
                                    </div>
                                    <div className="col-md-3">
                                        <Field 
                                            component={Button} 
                                            type={`submit`}
                                            name={`btn-submit`}
                                            color={`btn-success`}
                                            icon={`fa fa-save`}
                                            description={`Salvar`}
                                            />
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPapeis, buscarPermissoes, alterarPapel }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);