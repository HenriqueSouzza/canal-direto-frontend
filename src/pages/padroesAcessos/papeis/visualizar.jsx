import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import SelectMultiple from '../../../components/form/selectMultiple';

import Select from '../../../components/form/select';

import { buscarPapeis, alterarPapel } from './actions';

import { buscarPermissoes } from '../permissoes/actions';

import { buscarCategoria } from '../categoria/actions';

import { buscarSubMenu } from '../submenu/actions';

import { buscarFormularios } from '../formularios/actions';



class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarPapeis('?where[id]=' + this.props.match.params.id)
        this.props.buscarPermissoes('?where[prefix]=api/canal-direto')
        this.props.buscarCategoria()
        this.props.buscarFormularios()
        this.props.buscarSubMenu()
    }

    onSubmit = values => {
        const params = {}

        params.papel = values.papel
        params.descricao = values.descricao
        params.sistema = 1

        if(values.formulario){
            params.formulario = values.formulario
        }

        if(values.submenu){
            params.submenu = values.submenu.map( row => (row.value))
        }

        if(values.permissoes){
            params.permissao = values.permissoes.map( row => (row.value))
        }
        
        if(values.categoria){
            params.categoria = values.categoria.map( row => (row.value))
        }

        this.props.alterarPapel(params, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, papeis, permissoes, formularios, categoria, submenu } = this.props.padroesAcessos

        const initialValues = {}
        
        if(papeis.response){
            initialValues.papel = papeis.response.content[0].papel
            initialValues.descricao = papeis.response.content[0].descricao
            initialValues.sistema = papeis.response.content[0].sistemas.nome_sistema
            initialValues.formulario = papeis.response.content[0].formulario && papeis.response.content[0].formulario.id ? papeis.response.content[0].formulario.id : ''
            initialValues.permissoes = papeis.response.content[0].permissoes.map(row => ({value: parseInt(row.id), label: row.permissao}))

            initialValues.categoria = []

            papeis.response.content[0].setorCategoria.map(row => 
                row.categoria.map( val => initialValues.categoria.push({ value: parseInt(val.id), label: row.setor + ' - ' + val.descricao }))
            )

            initialValues.submenu = []

            papeis.response.content[0].menus.map(row => 
                row.submenus.map( val => initialValues.submenu.push({ value: parseInt(val.id), label: row.nome + ' - ' + val.nome }))
            )
        }

        
        let subMenuSelect = []
        
        if(submenu.response){
            subMenuSelect = submenu.response.content.map( row => ({ value: row.id, label: row.menu[0].nome + ' - ' + row.nome })) 
        }

        let categoriaSelect = []
        
        if(categoria.response){
            categoriaSelect = categoria.response.content.map( row => ({ value: row.id, label: row.setor[0].descricao + ' - ' + row.descricao })) 
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
                        render={({ handleSubmit }) => (
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

                                {/***************************** MENUS *****************************
                                ***********************************************************************/}

                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Informe os Menus</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12">
                                                <Field
                                                    component={SelectMultiple}
                                                    name={`submenu`}
                                                    label={`Menus`}
                                                    options={subMenuSelect}
                                                    isMulti
                                                    closeMenu={false}
                                                    multiple
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
                                                <Field
                                                    component={SelectMultiple}
                                                    name={`categoria`}
                                                    label={`Categorias`}
                                                    options={categoriaSelect}
                                                    isMulti
                                                    closeMenu={false}
                                                    multiple
                                                    />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
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
                                                    label={`Permissões`}
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPapeis, buscarPermissoes, alterarPapel, buscarCategoria, buscarSubMenu, buscarFormularios }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);