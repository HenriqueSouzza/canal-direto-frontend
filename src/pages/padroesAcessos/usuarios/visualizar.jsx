import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import SelectMultiple from '../../../components/form/selectMultiple';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import { alterarUsuario, buscarUsuarios } from './actions';

import { buscarPermissoes } from '../permissoes/actions';

import { buscarPapeis } from '../papeis/actions';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarUsuarios('?where[id]=' + this.props.match.params.id)
        this.props.buscarPermissoes('?where[prefix]=api/canal-direto')
        this.props.buscarPapeis('?where[sistema]=1')
    }

    onSubmit = values => {
        let params = {}

        params.name = values.name
        params.email = values.email

        if(values.permissoes){
            params.permissao = values.permissoes.map( row => (row.value))
        }else{
            params.permissao = []
        }

        if(values.papeis){
            params.papeis = values.papeis.map( row => (row.value))
        }else{
            params.papeis = []
        }

        this.props.alterarUsuario(params, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, usuarios, permissoes, papeis } = this.props.padroesAcessos

        const initialValues = {}

        if(usuarios.response){
            initialValues.name = usuarios.response.content[0].name
            initialValues.email = usuarios.response.content[0].email
        }

        let permissoesSelect = {}
        
        if(permissoes.response){
            permissoesSelect = permissoes.response.content.map(row => ({value: row.id, label: row.permissao}))
        }
        
        let papeisSelect = {}
        
        if(papeis.response){
            papeisSelect = papeis.response.content.map(row => ({value: row.id, label: row.papel}))
        }

        return(
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Dados e permissões do usuário`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={initialValues}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Dados do Usuário</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`name`} 
                                                    label={`Nome:`}
                                                    icon={``}
                                                    disabled
                                                    placeholder={`Digite o nome do status`}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`email`} 
                                                    label={`E-mail:`}
                                                    icon={`fa fa-envelope`}
                                                    disabled
                                                    placeholder={`Digite para o que será utilizado`}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Papeis do Usuário</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12">
                                                <Field
                                                    component={SelectMultiple}
                                                    name={`papeis`}
                                                    options={papeisSelect}
                                                    isMulti
                                                    closeMenu={false}
                                                    multiple
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                            onClick={() => this.onVoltar()}
                                            color={`btn-dark`}
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
                                            description={`Alterar`}
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
const mapDispatchToProps = dispatch => bindActionCreators({ alterarUsuario, buscarUsuarios, buscarPermissoes, buscarPapeis }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);
