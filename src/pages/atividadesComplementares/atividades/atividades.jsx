import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import Button from '../../../components/form/button';

import Table from '../../../components/table/dataTable';

import { FORM_RULES } from '../../../helpers/validations';

import { ACTION_RULES } from '../../../helpers/authorization';

import Select from '../../../components/form/select';

import MenuHeader from '../../../components/menu/menuHeader';

import { buscarAtividade, buscarAtividadeSelect, removerAtividade } from './actions';


class Atividades extends Component{

    componentDidMount(){
        this.props.buscarAtividadeSelect({});
    }

    onDelete = (param) => {
        const list = this.props.atividades.list.find(row => (row.ATIVIDADE = param))

        this.props.removerAtividade({ atividade:list.ATIVIDADE, codigo: list.TIPO_ATIV_COMPL, grupo: list.GRUPO})
    }

    onSubmit = async (values) => {
        this.props.buscarAtividade(values);
    }

    render(){

        const { loading, list, listSelect } = this.props.atividades

        const dataSelect = []

        if(listSelect.length > 0){
            listSelect.map(row => {
                dataSelect.push({id: row.GRUPO, name: row.GRUPO + ' - ' + row.DESCRICAO})
            })
        }

        const columns = [
            {
                name: 'Atividade',
                selector: 'ATIVIDADE',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'DESCRICAO',
                sortable: true,
            },
        ];

        return(
            <section className="content">
                <MenuHeader title={`Atividades`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Select} 
                                                    name={`grupo`} 
                                                    data={dataSelect}
                                                    label={`Grupo:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <label>&nbsp;</label>
                                                <Field
                                                    component={Button}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    icon={`fa fa-search`} 
                                                    description={`Buscar`}
                                                    />
                                            </div>
                                        </div>
                                    </form>
                                )}  
                            />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <Table 
                                description={`${list && list.length > 0 ? 'Atividades do grupo ' +  list[0].GRUPO : 'Selecione um grupo'}`}
                                checkbox={false} 
                                columns={columns} 
                                data={list} 
                                router={this.props.history}
                                actionDelete={this.onDelete}
                                btnAdd={!loading} 
                                actions={[ACTION_RULES.can_edit]}
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
const mapStateToProps = state => ({ atividades: state.atvAtividades })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarAtividade, buscarAtividadeSelect, removerAtividade }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Atividades);