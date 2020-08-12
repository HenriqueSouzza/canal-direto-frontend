import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import axios from 'axios';

import MenuHeader from '../../components/menu/menuHeader';

import LoadingBody from '../../components/loading/loadingBody';

import Input from '../../components/form/input';

import Checkbox from '../../components/form/checkbox';

import Button from '../../components/form/button';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import  { alterarSetor } from './actions'

class Editar extends Component{

    constructor(props) {
        super(props)

        if (props.setor.dadosSetor.length <= 0){
            props.history.goBack()
        } 
    } 

    onSubmit = values => {
        console.log(values);

        // values.ativo = (values.ativo ? "S" : "N");
        // values.usuario = 'marcos.barroso';
        
        // //console.log(values);

        // this.props.alterarSetor(values, this.props.match.params.id)
    }

    render(){

        const initialValues = {}

        const {dadosSetor} = this.props.setor

        dadosSetor.response.content.find(element => {
            if(element.id == this.props.match.params.id){
                initialValues.descricao = element.descricao
                initialValues.ativo = element.ativo
            }
         })
         
        //console.log(this.props);
        
        return(
                <>
                    <section className="content">
                        <LoadingBody status={false} />
                        <MenuHeader title={`Editar Setor`} history={this.props.location.pathname} />
                            <div className="content-fluid">
                                <div className="card">
                                    <div className="card-body">
                                    <Form
                                        onSubmit={this.onSubmit}
                                        initialValues={initialValues}
                                        render={({handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`descricao`} 
                                                            label={`Descrição:`}
                                                            icon={`fa fa-id-badge`}
                                                            placeholder={`Descrição`}
                                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`ativo`} 
                                                            label={`Ativo`}
                                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div>                                                                                                      
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-3">
                                                        {/* <label>&nbsp;</label> */}
                                                        <Field
                                                            component={Button}
                                                            name={`sendDados`}
                                                            type={`submit`} 
                                                            color={`btn-success`}
                                                            icon={`fa fa-sign-in`} 
                                                            description={`Editar`}
                                                            />
                                                    </div>
                                                    <div className="col-md-3">
                                                        {/* <label>&nbsp;</label> */}
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-dark"
                                                            onClick = {() => this.props.history.goBack()}
                                                            > Voltar 
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
                </>
            )   
        }
} 

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ setor: state.setor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Editar);