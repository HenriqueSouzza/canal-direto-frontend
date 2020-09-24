import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES } from '../../../helpers/validations';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import { buscarPermissoes, atualizarPermissoes } from './actions';

import moment from 'moment';

class Index extends Component{

    componentDidMount(){
        this.props.buscarPermissoes()
    }

    onSubmit = values => {

        let params = "?"

        if(values.id){
            params += '&where[id]=' + values.id
        }

        if(values.permissao){
            params += '&like=permissao,' + values.permissao
        }

        if(values.prefix){
            params += '&like=prefix,' + values.prefix
        }

        this.props.buscarPermissoes(params)
    }

    onAtualizarPermissao = () => {
        this.props.atualizarPermissoes()
    }

    render(){

        const { loading, permissoes } = this.props.padroesAcessos
        
        const dataPermissoes = []
        
        if(permissoes.response){
            permissoes.response.content.map(row => {
                dataPermissoes.push({
                    id: row.id,
                    permissao: row.permissao,
                    descricao: row.descricao,
                    prefix: row.prefix,
                    // criado: moment(row.created_at).calendar(),
                    criado: moment(row.created_at).format('DD-MM-YYYY H:mm'),
                })
            })
        }

        const columns = [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Permissão',
                selector: 'permissao',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'descricao',
                sortable: true,
            },
            {
                name: 'Prefix',
                selector: 'prefix',
                sortable: true,
            },
            {
                name: 'Criado em',
                selector: 'criado',
                sortable: true,
            }
        ];

        return (
                <section className="content">
                    <MenuHeader title={`Permissões do sistema`} history={this.props.location.pathname} />
                    <div className="content-fluid">
                        <div className="card card-danger">
                            <div className="card-header">
                                <h3 className="card-title">Filtros</h3>
                            </div>
                            <div className="card-body">
                                <Form
                                    onSubmit={this.onSubmit}
                                    render={({handleSubmit}) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="row justify-content-center">
                                                <div className="col-md-4">
                                                    <Field 
                                                        component={Input} 
                                                        type={`number`}
                                                        name={`id`} 
                                                        label={`Nº permissão:`}
                                                        icon={``}
                                                        placeholder={`1,2,3...`}
                                                        validate={FORM_RULES.number}
                                                        />
                                                </div>
                                                <div className="col-md-4">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`permissao`} 
                                                        label={`Permissao:`}
                                                        icon={``}
                                                        placeholder={`Digite a permissao`}
                                                        />
                                                </div>
                                                <div className="col-md-4">
                                                    <Field 
                                                        component={Input} 
                                                        type={`text`}
                                                        name={`prefix`} 
                                                        label={`Prefix:`}
                                                        icon={``}
                                                        placeholder={`Digite o prefix`}
                                                        />
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-md-4 text-center">
                                                    <Field 
                                                        component={Button} 
                                                        type={`submit`}
                                                        name={`sendFilter`}
                                                        color={`btn-success`} 
                                                        description={`Filtrar`}
                                                        icon={`fa fa-filter`}
                                                        disabled={loading}
                                                        />
                                                </div>
                                            </div>
                                        </form>
                                    )}/>
                            </div>
                        </div>
                        <div className="card card-danger">
                            <div className="card-body">
                                <div className="row justify-content-end">
                                    <div className="col-md-4">
                                        <Button
                                            type={`button`}
                                            description={`Atualizar Permissões`}
                                            color={`btn-info`}
                                            icon={`fa fa-retweet`}
                                            onClick={() => this.onAtualizarPermissao()}
                                            />
                                    </div>
                                    <br/>
                                    <div className="col-md-12">
                                        <DataTable
                                            description={false}
                                            checkbox={false} 
                                            columns={columns} 
                                            data={dataPermissoes} 
                                            router={this.props.history}
                                            actions={null}
                                            loading={loading} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPermissoes, atualizarPermissoes }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);