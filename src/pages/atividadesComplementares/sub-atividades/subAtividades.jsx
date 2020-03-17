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

import { removerSubatividade, buscarDadosSubAtividadeForm, buscarSubAtividade } from './actions';


const list = [
    { id: 1, name: 'Conan the Barbarian', year: '1982' },
    { id: 2, name: 'Donan the Barbarian', year: '1982' },
    { id: 3, name: 'Eonan the Barbarian', year: '1982' }
]

class SubAtividades extends Component{

    /**
     * 
     */
    componentDidMount(){
        this.props.buscarDadosSubAtividadeForm()
    }

    /**
     * 
     */
    handleChange = (values) => {
        if(values.grupo){
            this.props.buscarDadosSubAtividadeForm(values)
        }
    }

    /**
     * 
     */
    onDelete = (value) => {
        const dados = this.props.subAtividades.list.find(row => (row.SUB_ATIVIDADE == value))
        const params ={
            subAtividade: dados.SUB_ATIVIDADE,
            grupo: dados.TIPO_ATIV_COMPL, 
            atividade: dados.ATIVIDADE
        }
        this.props.removerSubatividade(params);
    }

    /**
     * 
     */
    onSubmit = async (values) => {
        this.props.buscarSubAtividade(values)
    }

    render(){

        let { list, loading, grupoSelect, atividadeSelect, loadingSelect } = this.props.subAtividades

        const grupo = []

        if(grupoSelect.grupo && grupoSelect.grupo.length > 0){
            grupoSelect.grupo.map(row => {
                grupo.push({
                    id: row.TIPO_ATIV_COMPL,
                    name: row.GRUPO + ' - ' + row.DESCRICAO
                })
            })
        }

        const atividade = []

        if(atividadeSelect.atividade && atividadeSelect.atividade.length > 0){
            atividadeSelect.atividade.map(row => {
                atividade.push({
                    id: row.ATIVIDADE,
                    name: row.ATIVIDADE + ' - ' + row.DESCRICAO
                })
            })
        }

        const columns = [
            {
                name: 'Sub-atividade',
                selector: 'SUB_ATIVIDADE',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'DESCRICAO',
                sortable: true,
            }
        ];

        return(
            <section className="content">
                <MenuHeader title={`Sub-atividades`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit, submitting, pristine, values}) => (
                                    <form onSubmit={handleSubmit} onChange={(e) => this.handleChange({[e.target.name]: e.target.value}, values)}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Select} 
                                                    name={`grupo`} 
                                                    data={grupo}
                                                    disabled={loadingSelect}
                                                    label={`Grupo atividade:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Select} 
                                                    name={`atividade`} 
                                                    data={atividade}
                                                    disabled={loadingSelect}
                                                    label={`Atividade:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <label>&nbsp;</label>
                                                <Field
                                                    component={Button}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    disabled={submitting || pristine || loadingSelect}
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
                                description={'Lista de sub-atividades'}
                                checkbox={false} 
                                columns={columns} 
                                data={list} 
                                router={this.props.history}
                                actionDelete={this.onDelete}
                                btnAdd={!loading}
                                // actions={[ACTION_RULES.can_edit, ACTION_RULES.can_remove]}
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
const mapStateToProps = state => ({ subAtividades: state.AtvSubAtividades })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ removerSubatividade, buscarDadosSubAtividadeForm, buscarSubAtividade }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(SubAtividades);