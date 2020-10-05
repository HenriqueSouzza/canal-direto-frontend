import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { Link } from 'react-router-dom';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarUsuarios } from './actions';

import moment from 'moment';


class Index extends Component{

    componentDidMount(){
        this.props.buscarUsuarios()
    }

    onSubmit = values => {
        let where = ''

        if(values.name){
            where += '?like=name,' + values.name
        }
        
        if(values.email){
            where += values.name ? '&like=email,' : '?like=email,' + values.email
        }

        this.props.buscarUsuarios(where)
    }

    render(){

        const { loading, usuarios} = this.props.padroesAcessos

        const dataUsuarios = []

        if(usuarios.response){
            usuarios.response.content.map(row => {
                dataUsuarios.push({
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    created_at: moment(row.created_at).calendar(),
                    link: '/padroes-acessos/usuarios/' + row.id + '/visualizar'
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
                name: 'Nome',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'E-mail',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Criado em',
                selector: 'created_at',
                sortable: true,
            },
            {
                name: 'Detalhe',
                button: true,
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
                                <i className={`fa fa-eye`}></i>
                            </Link>,
            }   
        ];

        return(
            <section className="content">
                <MenuHeader title={`Status de ticket`} history={this.props.location.pathname} />
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
                                                    type={`text`}
                                                    name={`name`} 
                                                    label={`Nome:`}
                                                    icon={``}
                                                    placeholder={`Nome`}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`email`} 
                                                    label={`E-mail:`}
                                                    icon={`fa fa-envelope`}
                                                    placeholder={`E-mail`}
                                                    />
                                            </div>
                                            <div className="col-md-2 text-center">
                                                <label>&nbsp;</label>
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
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataUsuarios} 
                                router={this.props.history}
                                actions={null}
                                loading={loading}
                            />
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarUsuarios }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
