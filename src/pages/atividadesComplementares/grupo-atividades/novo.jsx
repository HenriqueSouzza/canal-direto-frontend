import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import Button from '../../../components/form/button';

import Input from '../../../components/form/input';

import { salvarGrupoAtividade } from './actions';

import { FORM_RULES } from '../../../helpers/validations';


/**
 * @param {*} props 
 */
class Novo extends Component{

    constructor(props){
        super(props);
    }

    onSubmit = async value => {
        this.props.salvarGrupoAtividade(value, this.props.history)
    }

    render(){

        const dataSelect = [{
            id: 1,
            name: 'Ano'
        }]

        return(
            <section className="content">
                <MenuHeader title={`Novo grupo de atividade`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
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
                                            <div className="col-md-4">
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
                                                    icon={`fa fa-save`} 
                                                    color={`btn-success`}
                                                    description={`Salvar`}
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
const mapStateToProps = state => ({ grupoAtividade: state.atvGrupoAtividades })


/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ salvarGrupoAtividade }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);