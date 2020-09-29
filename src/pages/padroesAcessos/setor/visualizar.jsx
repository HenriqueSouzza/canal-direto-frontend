import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Checkbox from '../../../components/form/checkbox';

import Button from '../../../components/form/button';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import  { alterarSetor, buscarSetor } from './actions';

import DataTable from '../../../components/table/dataTable';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarSetor('?where[id]=' + this.props.match.params.id)
    }

    onSubmit = values => {
        const params = {}
        
        params.ativo = values.ativos ? 1 : 0
        params.descricao = values.descricao
        
        this.props.alterarSetor(params, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    onAdicionarCategoria = () => {
        this.props.history.push('/padroes-acessos/categoria/' + this.props.match.params.id + '/novo')
    }

    render(){

        const initialValues = {}

        const { loading, setor } = this.props.padroesAcessos

        let dataCategoria = []

        if(setor.response){
            initialValues.descricao = setor.response.content[0].descricao
            initialValues.ativo = setor.response.content[0].ativo ? true : false
            dataCategoria = setor.response.content[0].categoria.map( row => ({
                categoria: row.id,
                descricao: row.descricao,
                ativo: row.ativo == '1' ? 'sim' : 'não',
                link: '/padroes-acessos/categoria/' + row.id + '/visualizar' 
            }))
        }
        
        
        const columns = [
            {
                name: 'Categoria',
                selector: 'categoria',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'descricao',
                sortable: true,
            },            
            {
                name: 'Ativo',
                selector: 'ativo',
                sortable: true,
            },
            {
                name: 'Detalhes',
                button: true,
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
                                <i className={`fa fa-eye`}></i>
                            </Link>,
            }          
        ];    
        
        return(
                <section className="content">
                    <LoadingBody status={loading} />
                    <MenuHeader title={`Detalhe do Setor`} history={this.props.location.pathname} />
                    <div className="content-fluid">
                        <Form
                            onSubmit={this.onSubmit}
                            initialValues={initialValues}
                            render={({handleSubmit, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card card-danger">
                                        <div className="card-header">
                                            <h3 className="card-title">Dados do Setor</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`descricao`} 
                                                        label={`Nome do setor:`}
                                                        icon={`fa fa-id-badge`}
                                                        placeholder={`nome do setor`}
                                                        validate={composeValidators(FORM_RULES.required)}
                                                        />
                                                </div>                                                                                                      
                                                <div className="col-md-4 text-center">
                                                    <div className="">&nbsp;</div>
                                                    <Field 
                                                        component={Checkbox} 
                                                        type={`checkbox`}
                                                        name={`ativo`} 
                                                        label={`Ativo`}
                                                        />
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
                                                        icon={`fa fa-sign-in`} 
                                                        description={`Alterar`}
                                                        disabled={pristine}
                                                        />
                                                </div>                                                    
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="card card-danger">
                                        <div className="card-header">
                                            <h3 className="card-title">Dados da Categoria</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row justify-content-end">
                                                <div className="col-md-4">
                                                    <Button
                                                        description={`Adicionar`}
                                                        icon={`fa fa-plus`}
                                                        color={`btn-success`}
                                                        onClick={() => this.onAdicionarCategoria()}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <DataTable
                                                        description={false}
                                                        checkbox={false} 
                                                        columns={columns} 
                                                        data={dataCategoria} 
                                                        router={this.props.history}
                                                        loading={loading} 
                                                    />
                                                </div>                                                                                                      
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        />
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarSetor, alterarSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);