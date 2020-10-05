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

import  { alterarSetor, buscarMenus } from './actions';

import DataTable from '../../../components/table/dataTable';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarMenus('?where[id]=' + this.props.match.params.id)
    }

    onSubmit = values => {
        this.props.alterarSetor(values, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.push('/padroes-acessos/menus')
    }

    onAdicionarSubmenu = () => {
        this.props.history.push('/padroes-acessos/submenu/' + this.props.match.params.id + '/novo')
    }

    render(){

        const initialValues = {}

        const { loading, menus } = this.props.padroesAcessos

        let dataSubMenu = []

        if(menus.response){
            initialValues.nome = menus.response.content[0].nome
            initialValues.link = menus.response.content[0].link
            initialValues.icon = menus.response.content[0].icon
            dataSubMenu = menus.response.content[0].submenu.map( row => ({
                submenu: row.id,
                nome: row.nome,
                link: row.link,
                icon: row.icon,
                ativo: row.ativo == '1' ? 'sim' : 'não',
                link: '/padroes-acessos/submenu/' + row.id + '/visualizar' 
            }))
        }
        
        
        const columns = [
            {
                name: '#',
                selector: 'submenu',
                sortable: true,
            },
            {
                name: 'Nome',
                selector: 'nome',
                sortable: true,
            },            
            {
                name: 'Link',
                selector: 'link',
                sortable: true,
            },            
            {
                name: 'Ícone',
                selector: 'icon',
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
                    <MenuHeader title={`Detalhe do menu`} history={this.props.location.pathname} />
                    <div className="content-fluid">
                        <Form
                            onSubmit={this.onSubmit}
                            initialValues={initialValues}
                            render={({handleSubmit, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="card card-danger">
                                        <div className="card-header">
                                            <h3 className="card-title">Dados do menu</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`nome`} 
                                                        label={`Nome do menu:`}
                                                        icon={``}
                                                        placeholder={`nome do menu`}
                                                        validate={composeValidators(FORM_RULES.required, FORM_RULES.max(20))}
                                                        />
                                                </div>                                                                                                      
                                                <div className="col-md-4">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`link`} 
                                                        label={`Link:`}
                                                        icon={``}
                                                        placeholder={`link`}
                                                        validate={composeValidators(FORM_RULES.required)}
                                                        />
                                                </div>                                                                                                      
                                                <div className="col-md-4">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`icon`} 
                                                        label={`Ícone:`}
                                                        icon={``}
                                                        placeholder={`icone`}
                                                        validate={composeValidators(FORM_RULES.max(20))}
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
                                            <h3 className="card-title">Dados dos Submenu</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row justify-content-end">
                                                <div className="col-md-4">
                                                    <Button
                                                        description={`Adicionar`}
                                                        icon={`fa fa-plus`}
                                                        color={`btn-success`}
                                                        onClick={() => this.onAdicionarSubmenu()}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <DataTable
                                                        columns={columns} 
                                                        data={dataSubMenu} 
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMenus, alterarSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);