import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import Input from '../../../components/form/input';

import Checkbox from '../../../components/form/checkbox';

import Button from '../../../components/form/button';

import Select from '../../../components/form/select';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import  { buscarDadosSetor, cadastrarCategoria } from './actions'

class Cadastrar extends Component{

    constructor(props) {
        super(props)

        if (props.setor.dadosSetor.length <= 0){
            props.history.goBack()
        } 
    } 

    onSubmit = values => {

        values.ativo = (values.ativo_in ? "S" : "N");
        values.permite_abertura = (values.permite_abertura_in ? "S" : "N");
        values.permite_interacao = (values.permite_interacao_in ? "S" : "N");
        values.permite_n_tickets = (values.permite_n_tickets_in ? "S" : "N");
        values.usuario = 'marcos.barroso';
        
        //console.log(values);

        this.props.cadastrarCategoria(values, this.props.history)

    }

    render(){

        const initialValues = {
            setor: this.props.match.params.id

        }

        const {dadosSetor} = this.props.categoria

        let data = [];
        
        if (dadosSetor.response){
            
            //console.log(dadosSetor.response.content);
            let dados = dadosSetor.response.content

            dados.map(row => {
                if(row.id == this.props.match.params.id){
                    data.push({id: row.id, name:row.descricao})
                }
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
                                        render={({handleSubmit,submitSucceeded,pristine}) => (<form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Field 
                                                            component={Select} 
                                                            name={`setor`} 
                                                            data={data}
                                                            label={`Setor:`}
                                                            // disabled={true}
                                                            validate={FORM_RULES.required}
                                                        />
                                                    </div>                                                    
                                                    <div className="col-md-6">
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
                                                </div>
                                                <div className="row">
                                                <div className="col-md-6">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`ativo_in`} 
                                                            label={`Ativo`}
                                                            // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                        />
                                                    </div>                                                   
                                                    <div className="col-md-6">
                                                            <Field 
                                                                component={Checkbox} 
                                                                type={`checkbox`}
                                                                name={`permite_abertura_in`} 
                                                                label={`Permite Abertura`}
                                                                // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div>  
                                                    <div className="col-md-6">
                                                            <Field 
                                                                component={Checkbox} 
                                                                type={`checkbox`}
                                                                name={`permite_interacao_in`} 
                                                                label={`Permite Interação`}
                                                                // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                            />
                                                    </div> 
                                                    <div className="col-md-6">
                                                            <Field 
                                                                component={Checkbox} 
                                                                type={`checkbox`}
                                                                name={`permite_n_tickets_in`} 
                                                                label={`Permite Abrir com Chamado Aberto`}
                                                                // validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
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
                                                            disabled={pristine}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
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
const mapStateToProps = state => ({ categoria: state.categoria, setor: state.setor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosSetor,cadastrarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Cadastrar);