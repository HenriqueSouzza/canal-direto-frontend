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

import { buscarPapeis, novoPapel } from './actions';

import { buscarPermissoes } from '../permissoes/actions';

import { buscarSetor } from '../setor/actions';

import { buscarCategoria } from '../categoria/actions';


class Novo extends Component{

    componentDidMount(){
        this.props.buscarPermissoes('?where[prefix]=api/canal-direto')
        this.props.buscarSetor()
    }

    state = {
        dataCategoria: []
    }

    onSubmit = values => {
        const params = {}

        params.papel = values.papel
        params.descricao = values.descricao
        params.sistema = 1

        if(values.permissoes){
            params.permissao = values.permissoes.map( row => (row.value))
        }

        console.log(values)
        // this.props.novoPapel(params, this.props.history)
    }

    // redireciona para tela de setor
    onSetor = () => {
        this.props.history.push('novo/setor-papeis')
    }

    onChangeForm = (name, value) => {
        let { setor } = this.props.padroesAcessos

        let dataCategoria = {}

        if(name == 'setores'){
            this.props.buscarCategoria('?where[id_setor]=' + value)
            
            const setorTemp = setor.response.content.find(row => row.id == value )
            dataCategoria = setorTemp.categoria.map(val => ({value: val.id, label: val.descricao}))
        }

        this.setState({dataCategoria: dataCategoria})
    }

    render(){

        const { loading, permissoes, setor, categoria } = this.props.padroesAcessos

        let categoriaSelect = []

        if(categoria.response){
            categoriaSelect = categoria.response.content.map(row => ({value: row.id, label: row.descricao}))
        }

        let setorSelect = []

        if(setor.response){
            setorSelect = setor.response.content.map(row => ({ id: row.id, name: row.descricao }))
        }

        let permissoesSelect = {}

        if(permissoes.response){
            permissoesSelect = permissoes.response.content.map(row => ({value: row.id, label: row.permissao}))
        }

        const initialValues = {
            categoria: this.state.dataCategoria
        }

        return( 
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Novo papel`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={initialValues}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit} onChange={(e) => this.onChangeForm(e.target.name, e.target.value)}>

                                {/************************ PAPEIS ******************************
                                ****************************************************************/}

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
                                                    component={Select}
                                                    name={`setores`}
                                                    data={setorSelect}
                                                    label={`Setor`}
                                                    />
                                            </div>
                                            { categoriaSelect.length > 0 ? 
                                                <div className="col-md-12">
                                                    <Field
                                                        component={SelectMultiple}
                                                        label={`Categoria`}
                                                        name={`categoria`}
                                                        options={categoriaSelect}
                                                        isMulti
                                                        closeMenu={false}
                                                        multiple
                                                        />
                                                </div>
                                            : ''}
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPapeis, buscarPermissoes, novoPapel, buscarSetor, buscarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);