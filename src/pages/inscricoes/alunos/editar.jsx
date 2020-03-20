import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import { FORM_RULES } from '../../../helpers/validations';

import Button from '../../../components/form/button';

import Checkbox from '../../../components/form/checkbox';

import Input from '../../../components/form/input';

import { alterarAluno } from './actions';

/**
 * @param {*} props 
 */
class Editar extends Component{

    constructor(props){
        super(props)
        if(props.alunos.list.length <= 0){
            props.history.goBack()
        }
    }

    /**
     * 
     */
    onSubmit = async (values) => {

        const valuesForm = this.props.alunos.list.find(row => (row.ORDEM == this.props.match.params.ordem))

        values.periodo = valuesForm.ANO_SEMESTRE
        values.tipo = valuesForm.TIPO_ATIV_COMPL
        values.atividade = valuesForm.ATIVIDADE
        values.subatividade = valuesForm.SUB_ATIVIDADE
        values.abandono = values.abandono ? '1' : '0'

        this.props.alterarAluno([values], this.props.history)
    }

    render(){

        const { list } = this.props.alunos 

        const valuesForm = list.find(row => (row.ORDEM == this.props.match.params.ordem))

        //Valores que serão inseridos nos input a propriedades tem que ser os mesmos dos names definidos dos input's
        const initialValues = {
            aluno: valuesForm ? valuesForm.ALUNO : '',
            name: valuesForm ? valuesForm.NOME_COMPL : '',
            abandono: valuesForm ?  valuesForm.ABANDONO == '1' : false,
            dataFim: valuesForm ? valuesForm.DATA_FIM_ATIV : ''
        }

        return(
            <section className="content">
                <MenuHeader title={`Editar inscrição`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                        <Form
                                onSubmit={this.onSubmit}
                                initialValues={initialValues}
                                render={({handleSubmit, submitting, pristine}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input}
                                                    type={`text`}
                                                    disabled={true}
                                                    icon={`fa fa-key`}
                                                    name={`aluno`} 
                                                    label={`Aluno:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input} 
                                                    name={`name`} 
                                                    disabled={true}
                                                    icon={`fa fa-user`}
                                                    label={`Nome do aluno:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Checkbox} 
                                                    type={`checkbox`}
                                                    name={`abandono`}
                                                    label={`Abandono`}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Field 
                                                    component={Input}
                                                    type={`date`} 
                                                    icon={`fa fa-calendar`}
                                                    name={`dataFim`} 
                                                    label={`Data fim:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Field
                                                    component={Button}
                                                    type={`submit`}
                                                    disabled={submitting || pristine}
                                                    icon={`fa fa-edit`} 
                                                    color={`btn-success`}
                                                    description={`Alterar`}
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
 * @param {*} state 
 */
const mapStateToProps = state => ({ alunos: state.atvAlunos })


/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarAluno }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Editar);