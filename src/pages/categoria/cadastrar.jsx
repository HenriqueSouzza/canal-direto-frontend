import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../components/menu/menuHeader';

import LoadingBody from '../../components/loading/loadingBody';

import Input from '../../components/form/input';

import Checkbox from '../../components/form/checkbox';

import Button from '../../components/form/button';

import Select from '../../components/form/select';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import  { buscarDadosSetor, cadastrarCategoria } from './actions'

class Cadastrar extends Component{

    componentDidMount(){

        this.props.buscarDadosSetor()

    }

    onSubmit = values => {

        values.ativo = (values.ativo ? "S" : "N");
        values.usuario = 'marcos.barroso';
        
        //console.log(values);

        this.props.cadastrarCategoria(values, this.props.history)

    }

    render(){

        const initialValues = {}

        const {dadosSetor} = this.props.categoria

        let data = [];
        
        if (dadosSetor.response){
            
            //console.log(dadosSetor.response.content);
            let dados = dadosSetor.response.content

            dados.map(row => {
                data.push({id: row.id, name:row.descricao})
            });
        } 


        return(
                <>
                    <section className="content">
                        <LoadingBody status={false} />
                        <MenuHeader title={`Cadastrar Categoria`} history={this.props.location.pathname} />
                            <div className="content-fluid">
                                <div className="card">
                                    <div className="card-body">
                                    <Form
                                        onSubmit={this.onSubmit}
                                        initialValues={initialValues}
                                        render={({handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <Field 
                                                            component={Select} 
                                                            name={`id_setor`} 
                                                            data={data}
                                                            label={`Setor:`}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>                                                    
                                                    <div className="col-md-5">
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
                                                            description={`Cadastrar`}
                                                            />
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
const mapStateToProps = state => ({ categoria: state.categoria })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosSetor,cadastrarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Cadastrar);