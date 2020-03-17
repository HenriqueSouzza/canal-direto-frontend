import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import Select from '../../../components/form/select';

import Button from '../../../components/form/button';

import Checkbox from '../../../components/form/checkbox';

import SelectMultiple from '../../../components/form/selectMultiple';

import Input from '../../../components/form/input';

import Upload from '../../../components/form/upload';

import { alterarSubAtividade, buscarDadosEditarSubAtividade } from './actions';

import { FORM_RULES } from '../../../helpers/validations';

import arrayMutators from "final-form-arrays";

import { FieldArray } from 'react-final-form-arrays';



/**
 * @param {*} props 
 */
class Editar extends Component{

    constructor(props){
        super(props);
        if(props.subAtividades.list.length <= 0){
            props.history.goBack()
        }
    }

    componentDidMount(){
        this.props.buscarDadosEditarSubAtividade()
    }

    /**
     * 
     */
    cursosSelecionados = (values, fields) => {

        if(values){
            return (
                <table className="table">
                    <thead>
                        <tr className="row">
                            <td className="col-md-8">Curso</td>
                            <td className="col-md-2">Semestre</td>
                            <td className="col-md-1">Carga Horaria</td>
                            <td className="col-md-1">Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            values.map( (row, index) => (
                                <tr key={index + 1} className="row">
                                    <td className="col-md-8">
                                        {
                                            row.curso ?
                                                row.curso.map( (cursos, i) => (cursos.label + (row.curso.length > (i+1) ? ', ' : '') ))
                                            : ''
                                        }
                                    </td>  
                                    <td className="col-md-2">
                                        {
                                            row.semestre ? 
                                                row.semestre.map( (semestres, i) => (semestres.label  + (row.semestre.length > (i+1) ? '-' : '') ))
                                            : ''
                                        }
                                    </td>  
                                    <td className="col-md-1">
                                        { row.cargaHoraria ? row.cargaHoraria : ''}
                                    </td>  
                                    <td className="col-md-1">
                                        <button type={`button`} onClick={() => fields.remove(index)} className="btn btn-danger">
                                            <i className="">x</i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
    }

    onSubmit = async value => {
        
        const formData = new FormData();

        const dados = this.props.subAtividades.list.find(row => (row.SUB_ATIVIDADE == this.props.match.params.subatividade))

        value.tipo = dados.TIPO_ATIV_COMPL
        value.atividade = dados.ATIVIDADE
        value.cursoResp = dados.CURSO_RESP
        value.subatividade = dados.SUB_ATIVIDADE

        formData.append('descricao', value.descricao)
        formData.append('data_inicio', value.data_inicio)
        formData.append('data_fim', value.data_fim)
        formData.append('instituicao', value.instituicao)
        formData.append('curso', value.cursoResp)
        formData.append('vagas', value.vagas)
        formData.append('horario', value.horario)
        formData.append('local_ativ', value.local_ativ)
        formData.append('aonline_dt_ini', value.aonline_dt_ini)
        formData.append('aonline_dt_fim', value.aonline_dt_fim)
        formData.append('blackboard', value.blackboard)
        formData.append('num_func', value.num_func ? value.num_func : '')
        formData.set('cursosAssociados', JSON.stringify(value.cursosAssociados))
        formData.append('ementa', value.ementa)
        formData.append('tipo_ativ_compl', value.tipo)
        formData.append('atividade', value.atividade)
        formData.append('sub_atividade', value.subatividade)

        this.props.alterarSubAtividade(formData)
    }

    render(){

        const { list, formEditData, loadingSelect } = this.props.subAtividades

        const docente = []

        if(formEditData.docente){
            formEditData['docente'].map( row => {
                docente.push({id: row.NUM_FUNC, name: row.NOME_COMPL})
            })  
        } 

        const instituicao = []

        if(formEditData.instituicao){
            formEditData['instituicao'].map(row => {
                instituicao.push({id: row.OUTRA_FACULDADE, name: row.NOME_COMP})
            })
        }

        const cursos = [];

        if(formEditData.curso){
            formEditData['curso'].map( row => {
                cursos.push({value: row.CURSO, label: row.CURSO + ' - ' + row.NOME})
            })  
        } 
        
        const semestre = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
            { value: '10', label: '10' },
            { value: '11', label: '11' },
            { value: '12', label: '12' },
        ];


        const dados = list.find(row => (row.SUB_ATIVIDADE == this.props.match.params.subatividade))

        const cursoAssociadosCurso = []

        if(dados){

            if(dados.CURSOS){

                Object.values(dados.CURSOS).map( (row) => {
                    const dadoCurso = []
                    const dadoSemestre = [];
                    let dadoCH;

                    row.map( (dado) => {
                        
                        dadoCurso.push({ value: dado.curso, label: dado.curso + ' - ' + dado.nome_curso})

                        dadoCH = dado.ch
                        
                    })
                    
                    const semestreTemp  = row[0].semestre.split('-')

                    semestreTemp.map(sem => {
                        dadoSemestre.push({value: sem, label: sem})
                    })
                    
                    cursoAssociadosCurso.push({ curso : dadoCurso, semestre: dadoSemestre, cargaHoraria: dadoCH })

                })
                
            }
        }

        const initialValues = {
            descricao: dados ? dados.DESCRICAO : '',
            data_inicio: dados ? dados.DATA_INICIO : '', 
            data_fim: dados ? dados.DATA_FIM : '',
            instituicao: dados ? dados.INSTITUICAO : '',
            vagas: dados ? dados.VAGAS : '',
            horario: dados ? dados.HORARIO : '',
            local_ativ: dados ? dados.LOCAL_ATIV : '',
            aonline_dt_ini: dados ? dados.AONLINE_DT_INI : '', 
            aonline_dt_fim: dados ? dados.AONLINE_DT_FIM : '', 
            ementa: dados ? dados.EMENTA : '', 
            blackboard: dados ? dados.BLACKBOARD : '',
            num_func: dados ? dados.NUM_FUNC : '',
            cursosAssociados: cursoAssociadosCurso
        }

        return(
            <section className="content">
                <MenuHeader title={`Editar grupo de atividade`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                initialValues={initialValues}
                                mutators={{
                                    ...arrayMutators
                                }}
                                render={({
                                            handleSubmit, 
                                            submitting, 
                                            pristine, 
                                            values,
                                            form: {
                                                mutators: { push, pop }
                                            }
                                        }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Grupo:</label>
                                                        <div className="">
                                                            {dados ? dados.GRUPO : ''}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Atividade:</label>
                                                        <div className="">
                                                            {dados ? dados.ATIVIDADE : ''}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`descricao`} 
                                                            placeholder={`Descrição da subatividade`}
                                                            label={`Nome sub-atividade (nome fantasia):`}
                                                            icon={'fa fa-user'}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`date`}
                                                            name={`data_inicio`} 
                                                            placeholder={`Data inicio`}
                                                            label={`Data início:`}
                                                            icon={'fa fa-calendar'}
                                                            />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`date`}
                                                            name={`data_fim`} 
                                                            placeholder={`Data fim`}
                                                            label={`Data fim:`}
                                                            icon={'fa fa-calendar'}
                                                            />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Select} 
                                                            name={`instituicao`} 
                                                            data={instituicao}
                                                            label={`Instituição:`}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Curso responsável:</label>
                                                        <div className="">
                                                            { dados ? dados.CURSO_RESP + ' - ' + dados.DESC_CURSO_RESP :'' }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Select} 
                                                            name={`num_func`} 
                                                            data={docente}
                                                            label={`Docente responsável:`}
                                                            />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`number`}
                                                            name={`vagas`} 
                                                            placeholder={`Vagas`}
                                                            label={`Vagas:`}
                                                            icon={'fa fa-address-book'}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`time`}
                                                            name={`horario`} 
                                                            label={`Horário:`}
                                                            icon={'fa fa-hourglass'}
                                                            />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`local_ativ`} 
                                                            label={`Local:`}
                                                            icon={'fa fa-globe'}
                                                            />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Upload} 
                                                            type={`file`}
                                                            name={`ementa`} 
                                                            label={`Ementa:`}
                                                            icon={'fa fa-upload'}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <label>Selecione os cursos</label>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-4 offset-1">
                                                        <div className={`form-group`}>
                                                            <div className="">
                                                                <label>&nbsp;</label>
                                                            </div>
                                                            <button className="btn btn-success" type="button" onClick={() => push('cursosAssociados', {})}>
                                                                Adicionar
                                                            </button>
                                                        </div>  
                                                    </div> 
                                                    <div className="col-md-4 offset-1">
                                                        <div className={`form-group`}>
                                                            <div className="">
                                                                <label>&nbsp;</label>
                                                            </div>  
                                                            <button className="btn btn-danger" type="button" onClick={() => pop('cursosAssociados')}>
                                                                Remover
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <FieldArray name="cursosAssociados">
                                                            {({ fields }) => 
                                                                {
                                                                    let nameCurrent = 0
                                                                    
                                                                    fields.map( (name) => {
                                                                        nameCurrent = name
                                                                    })

                                                                    if(fields.value && fields.value.length > 0){
                                                                        return(
                                                                            <div>
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <Field
                                                                                            component={SelectMultiple}
                                                                                            name={`${nameCurrent}[curso]`}
                                                                                            options={cursos}
                                                                                            label={`Curso`}
                                                                                            isMulti
                                                                                            closeMenu={false}
                                                                                            multiple={true}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <Field
                                                                                            component={SelectMultiple}
                                                                                            name={`${nameCurrent}[semestre]`}
                                                                                            options={semestre}
                                                                                            label={`Semestre`}
                                                                                            isMulti
                                                                                            closeMenu={false}
                                                                                            multiple={true}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-md-2">
                                                                                        <Field
                                                                                             component={Input} 
                                                                                             type={`number`}
                                                                                             name={`${nameCurrent}[cargaHoraria]`} 
                                                                                             placeholder={`10h`}
                                                                                             label={`Carga Horária:`}
                                                                                             icon={'fa fa-time'}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    {this.cursosSelecionados(values.cursosAssociados, fields)}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return ''
                                                                    }
                                                                    
                                                                }
                                                            }
                                                        </FieldArray>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div>
                                                    <label>Habilitar inscrição no aluno on-line</label>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`date`}
                                                            name={`aonline_dt_ini`} 
                                                            placeholder={`Data inicio`}
                                                            label={`Data início de divulgação no on-line:`}
                                                            icon={'fa fa-calendar'}
                                                            validate={FORM_RULES.required}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Input} 
                                                            type={`date`}
                                                            name={`aonline_dt_fim`} 
                                                            placeholder={`Data inicio`}
                                                            label={`Data fim de divulgação no on-line:`}
                                                            icon={'fa fa-calendar'}
                                                            validate={FORM_RULES.required}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`aonline_inscr`} 
                                                            label={`Inscrição on-line`}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`atv_aonline`} 
                                                            label={`Atividade no Docente On-line`}
                                                        />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`blackboard`} 
                                                            label={`Disciplina será ministrada no blackboard ?`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-3">
                                                        <Field
                                                            component={Button}
                                                            type={`submit`}
                                                            icon={`fa fa-save`} 
                                                            color={`btn-primary`}
                                                            disabled={loadingSelect || submitting || pristine} 
                                                            description={`Alterar`}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button type={`button`} className={`btn btn-danger btn-block`} onClick={() => this.props.history.goBack()}>
                                                            <i className="fa fa-arrow-left"></i> Voltar
                                                        </button>
                                                    </div>
                                                </div>
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
const mapStateToProps = state => ({ subAtividades: state.AtvSubAtividades })


/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarSubAtividade, buscarDadosEditarSubAtividade }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Editar);