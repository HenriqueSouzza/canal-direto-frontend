import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import Button from '../../../components/form/button';

import Input from '../../../components/form/input';

import { FORM_RULES } from '../../../helpers/validations';

import { alterarGrupoAtividade } from './actions';


/**
 * @param {*} props 
 */
class Editar extends Component{

    constructor(props){
        super(props);

        if(props.grupoAtividade.list.length <= 0){
            props.history.goBack()
        }
    }

    onSubmit = async value => {
        
        value.codigo = this.props.match.params.grupo

        this.props.alterarGrupoAtividade(value)
    }

    render(){

        const { list } = this.props.grupoAtividade

        const initialValues = {
            grupo: '',
            descricao: ''
        }

        list.find(element => {
           if(element.TIPO_ATIV_COMPL == this.props.match.params.grupo){
                initialValues.descricao = element.DESCRICAO
                initialValues.grupo = element.GRUPO
           }
        })

        return(
            <section className="content">
                <MenuHeader title={`Editar grupo de atividade`} history={this.props.location.pathname} />
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
                                                    name={`grupo`} 
                                                    placeholder={`Grupo`}
                                                    label={`Grupo:`}
                                                    icon={'fa fa-object-group'}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`descricao`} 
                                                    placeholder={`Descriçao`}
                                                    label={`Descrição:`}
                                                    icon={'fa fa-tags'}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Field
                                                    component={Button}
                                                    type={`submit`}
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
const mapStateToProps = state => ({ grupoAtividade: state.atvGrupoAtividades })


/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarGrupoAtividade }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Editar);