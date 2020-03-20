import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import Select from '../../../components/form/select';

import Button from '../../../components/form/button';

import Input from '../../../components/form/input';

import { salvarAluno, buscarDadosForm } from './actions';

import { FORM_RULES } from '../../../helpers/validations';


/**
 * @param {*} props 
 */
class Novo extends Component{

    constructor(props){
        super(props);
        if(props.alunos.periodoSelect.length <= 0){
            props.history.goBack()
        }
    }

    //Change do formulario
    handleChange = (values,state) => {
        if(values.aluno || values.subatividade){

        }else{

            if(values.atividade){
                values.tipo = state.tipo
            }
            
            this.props.buscarDadosForm(values)
        }
    }


    onSubmit = async value => {
        this.props.salvarAluno(value, this.props.history)
    }

    render(){

        const { periodoSelect, grupoSelect, atividadeSelect, subatividadeSelect } = this.props.alunos

        const periodo = []
        
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
                <MenuHeader title={`Nova inscrição`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit, submitting, pristine, values}) => (
                                    <form onSubmit={handleSubmit} onChange={(e) => this.handleChange({[e.target.name]: e.target.value}, values)}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`periodo`} 
                                                    data={periodo}
                                                    label={`Ano/Semestre:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`tipo`} 
                                                    data={grupo}
                                                    label={`Tipo:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`atividade`} 
                                                    data={atividade}
                                                    label={`Atividade:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Select} 
                                                    name={`subatividade`} 
                                                    data={subatividade}
                                                    label={`Sub-atividade:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`aluno`} 
                                                    placeholder={`Matricula`}
                                                    label={`Aluno:`}
                                                    icon={'fa fa-user'}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Field
                                                    component={Button}
                                                    type={`submit`}
                                                    icon={`fa fa-save`} 
                                                    color={`btn-success`}
                                                    description={`Salvar`}
                                                    disabled={submitting || pristine}
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <button type={`button`} className={`btn btn-danger btn-block`} onClick={() => this.props.history.goBack()}>
                                                    <i className="fa fa-arrow-left"></i> Voltar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}  
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = state => ({ alunos: state.atvAlunos })


/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ salvarAluno, buscarDadosForm }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);