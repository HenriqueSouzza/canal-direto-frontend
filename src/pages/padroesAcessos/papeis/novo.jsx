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

import { buscarPapeis, novoPapel } from './actions';

import { buscarPermissoes } from '../permissoes/actions';

import { buscarCategoria } from '../categoria/actions';


class Novo extends Component{

    componentDidMount(){
        this.props.buscarPermissoes('?where[prefix]=api/canal-direto')
        this.props.buscarCategoria()
    }

    onSubmit = values => {
        const params = {}

        params.papel = values.papel
        params.descricao = values.descricao
        params.sistema = 1

        if(values.permissoes){
            params.permissao = values.permissoes.map( row => (row.value))
        }

        params.categoria = []

        if(values.categoria){
            values.categoria.map( row => params.categoria.push(row.value))
        }

        this.props.novoPapel(params, this.props.history)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, permissoes, setor, categoria, formularios } = this.props.padroesAcessos

        let categoriaSelect = []

        if(categoria.response){
            categoriaSelect = categoria.response.content.map( row => ({ value: row.id, label: row.setor[0].descricao + ' - ' + row.descricao })) 
        }

        let setorSelect = []

        if(setor.response){
            setorSelect = setor.response.content.map(row => ({ id: row.id, name: row.descricao }))
        }

        let permissoesSelect = []

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
                <MenuHeader title={`Novo papel`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>

                                {/************************ PAPEIS ******************************
                                ****************************************************************/}

                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Dados do formulário</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
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
                                            <div className="col-md-4">
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
                                            <div className="col-md-4">
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

                                {/***************************** CATEGORIA *****************************
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
                                    </div>
                                </div>

                                {/************************ PERMISSOES **************************
                                ****************************************************************/}

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
                                            name={`btn-voltar`}
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
                                            name={`btn-salvar`}
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPapeis, buscarPermissoes, novoPapel, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);