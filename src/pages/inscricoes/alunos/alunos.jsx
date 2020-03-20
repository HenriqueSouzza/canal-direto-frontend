import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import Button from '../../../components/form/button';

import Table from '../../../components/table/dataTable';

import { FORM_RULES } from '../../../helpers/validations';

import { ACTION_RULES } from '../../../helpers/authorization';

import Input from '../../../components/form/input';

import Select from '../../../components/form/select';

import Checkbox from '../../../components/form/checkbox';

import { removerAluno, buscarDadosForm, buscarAluno, alterarAluno, salvarAlunoLyceum } from './actions';


class Alunos extends Component{

    constructor(props){
        super(props)

        //
        this.state = {
            checkbox: [],
        }
    }

    componentDidMount(){
        this.props.buscarDadosForm({ano: ''})
    }

    setCheckbox = dados => {
        this.setState({checkbox: dados.selectedRows})
    }

    //Função para replicar data de finalização da atividade para todos os alunos selecionados
    onSubmitReplicar = async (values) => {
        const dados = []

        this.state.checkbox.map(row => {
            dados.push({
                dataFim: values.dataFim,
                abandono: values.abandono ? values.abandono : 0,
                periodo: row.ANO_SEMESTRE,
                tipo: row.TIPO_ATIV_COMPL,
                atividade: row.ATIVIDADE,
                subatividade: row.SUB_ATIVIDADE,
                aluno: row.ALUNO
            })
        })

        //parametro funcionalidade para saber se é editacao ou replicar
        this.props.alterarAluno(dados, this.props.history, true)

    }

    //Função para realizar a exportação dos alunos que foram selecionados para o lyceum
    onExportLyceum = () => {
        const dados = []

        this.state.checkbox.map(row => {
            if(row.LYCEUM == 0){
                dados.push({
                    periodo: row.ANO_SEMESTRE,
                    tipo: row.TIPO_ATIV_COMPL,
                    atividade: row.ATIVIDADE,
                    subatividade: row.SUB_ATIVIDADE,
                    aluno: row.ALUNO
                })
            }
        })

        this.props.salvarAlunoLyceum(dados)
    }

    //função para deletar um aluno da atividade
    onDelete = (param) => {
        const dados = this.props.alunos.list.find(row => row.ORDEM == param)
        
        const values = {
            periodo: dados.ANO_SEMESTRE,
            tipo: dados.TIPO_ATIV_COMPL,
            atividade: dados.ATIVIDADE,
            subatividade: dados.SUB_ATIVIDADE,
            aluno: dados.ALUNO
        }

        this.props.removerAluno(values)
    } 

    //Change do formulario
    handleChange = (values, state) => {
        if(values.nameAluno || values.subatividade){

        }else{

            if(values.atividade){
                values.tipo = state.tipo
            }
            
            this.props.buscarDadosForm(values)
        }
    }

    //Função para buscar os dados da atividade para listar na tabela
    onSubmit = async (values) => {
        this.props.buscarAluno(values)
    }

    render(){

        const { loading, loadingSelect, list, periodoSelect, grupoSelect, atividadeSelect, subatividadeSelect } = this.props.alunos

        const columns = [
            {
                name: 'Ordem',
                selector: 'ORDEM',
                sortable: true,
            },
            {
                name: 'Lyceum',
                selector: 'LYCEUM',
                sortable: true,
            },
            {
                name: 'Aluno',
                selector: 'ALUNO',
                sortable: true,
            },
            {
                name: 'Nome',
                selector: 'NOME_COMPL',
                sortable: true,
            },
            {
                name: 'Abandono',
                selector: 'ABANDONO',
                sortable: true,
            },
            {
                name: 'Finalizar atividade',
                selector: 'DATA_FIM_ATIV',
                sortable: true,
            }
        ];

        const periodo = []
        
        const dataSelect = []
        
        if(periodoSelect.periodo){
            periodoSelect.periodo.map( row => (
                periodo.push({id: row.ANO_SEMESTRE, name: row.ANO_SEMESTRE})
            ))
        }
            
        const grupo = []

        if(grupoSelect.grupo){
            grupoSelect.grupo.map(row => {
                grupo.push({id: row.TIPO_ATIV_COMPL, name: row.GRUPO + ' - ' + row.DESCRICAO})
            })
        }

        const atividade = []

        if(atividadeSelect.atividade){
            atividadeSelect.atividade.map(row => {
                atividade.push({id: row.ATIVIDADE, name: row.ATIVIDADE + ' - ' + row.DESCRICAO})
            })
        }

        const subatividade = []

        if(subatividadeSelect.subatividade){
            subatividadeSelect.subatividade.map(row => {
                subatividade.push({id: row.SUB_ATIVIDADE, name: row.DESCRICAO})
            })
        }

        return(
            <section className="content">
                <MenuHeader title={`Alunos`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit, submitting, pristine, values}) => (
                                    <form onSubmit={handleSubmit} onChange={(e) => this.handleChange({[e.target.name]: e.target.value}, values)}>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Field 
                                                    component={Select} 
                                                    name={`periodo`} 
                                                    data={periodo}
                                                    label={`Ano/Semestre:`}
                                                    validate={FORM_RULES.required}
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Select} 
                                                    name={`tipo`} 
                                                    data={grupo}
                                                    disabled={loadingSelect}
                                                    label={`Tipo:`}
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
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`subatividade`} 
                                                    data={subatividade}
                                                    disabled={loadingSelect}
                                                    label={`Sub-atividade:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                             <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`nameAluno`} 
                                                    label={`Nome do aluno:`}
                                                    placeholder={`Nome completo`}
                                                    icon={'far fa-user'}
                                                    // validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <label>&nbsp;</label>
                                                <Field
                                                    component={Button}
                                                    type={`submit`} 
                                                    disabled={submitting || pristine}
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
                    <div className={list.length <= 0 ? `d-md-none` : `card`}>
                        <div className="card-header">
                            <h5>Aplicar na tabela</h5>
                        </div>
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmitReplicar}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>&nbsp;</label>
                                                <div className="input-group mb-3 justify-content-center">
                                                    <button className="btn btn-secondary btn-block" type="button" disabled={this.state.checkbox.length <= 0 || loading ? true : false} onClick={() => this.onExportLyceum()} name="exportLyceum">
                                                        <i className="fa fa-upload"></i> Export para lyceum
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-5 offset-2">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div>&nbsp;</div>
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`abandono`}
                                                            label={`Abandono`}
                                                            />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field 
                                                            component={Input} 
                                                            name={`dataFim`}
                                                            type={`date`} 
                                                            icon={`fa fa-calendar`}
                                                            data={dataSelect}
                                                            label={`Data de finalização`}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <label>&nbsp;</label>
                                                <Field
                                                    component={Button}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    icon={`fa fa-save`} 
                                                    description={`Replicar`}
                                                    disabled={this.state.checkbox.length <= 0 ? true : false}
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
                                description={`Lista de inscritos`}
                                checkbox={true} //Se essa propriedade for habilitada como true, será obrigatório passar a propriedade setCheckbox
                                setCheckbox={this.setCheckbox} //Propriedade que será salvo os checkbox selecionados
                                columns={columns} //colunas da tabela
                                data={list} 
                                router={this.props.history}
                                actionDelete={this.onDelete}
                                btnExportCSV={list.length > 0} //Propriedade para adicionar o botão de csv
                                btnAdd={!loading}
                                actions={[ACTION_RULES.can_remove, ACTION_RULES.can_edit]}
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
const mapStateToProps = state => ({ alunos: state.atvAlunos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ removerAluno, buscarDadosForm, buscarAluno, alterarAluno, salvarAlunoLyceum }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Alunos);