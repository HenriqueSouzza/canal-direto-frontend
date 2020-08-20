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

import  { buscarDadosSetor, buscarDadosCategoriaId, alterarCategoria } from './actions'

class Editar extends Component{

    constructor(props) {
        super(props)

        if (props.setor.dadosSetor.length <= 0 || props.categoria.dadosCategoria.length <= 0){
            props.history.goBack()
        } 

    } 

    onSubmit = values => {

        values.ativo                = (values.ativo_in             ? "S" : "N");
        values.permite_abertura     = (values.permite_abertura_in  ? "S" : "N");       
        values.permite_interacao    = (values.permite_interacao_in ? "S" : "N"); 
        values.permite_n_tickets    = (values.permite_n_tickets_in ? "S" : "N");       
        values.usuario              = 'marcos.barroso';
        
        //console.log(values);

        this.props.alterarCategoria(values, this.props.match.params.id)

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

        const {dadosCategoria} = this.props.categoria

        //console.log(dadosCategoria);

        if(dadosCategoria.response){
            //console.log(dadosCategoria.response);
             if(Array.isArray(dadosCategoria.response.content)){
                dadosCategoria.response.content.find(element => {
                    if(element.id == this.props.match.params.id){
                        initialValues.id_setor = element.setor
                        initialValues.descricao = element.descricao
                        initialValues.ativo_in = (element.ativo == 'S' ? true : false)
                        initialValues.permite_abertura_in = (element.permite_abertura == 'S' ? true : false)
                        initialValues.permite_interacao_in = (element.permite_interacao == 'S' ? true : false)
                        initialValues.permite_n_tickets_in = (element.permite_n_tickets == 'S' ? true : false)
                    }
                 })
             }else{
                initialValues.id_setor = dadosCategoria.response.content.setor
                initialValues.descricao = dadosCategoria.response.content.descricao
                initialValues.ativo_in = (dadosCategoria.response.content.ativo == "S" ? true : false)
                initialValues.permite_abertura_in = (dadosCategoria.response.content.permite_abertura == 'S' ? true : false)
                initialValues.permite_interacao_in = (dadosCategoria.response.content.permite_interacao == 'S' ? true : false)
                initialValues.permite_n_tickets_in = (dadosCategoria.response.content.permite_n_tickets == 'S' ? true : false)
             }

        }
        

        return(
                <>
                    <section className="content">
                        <LoadingBody status={false} />
                        <MenuHeader title={`Editar Categoria`} history={this.props.location.pathname} />
                            <div className="content-fluid">
                                <div className="card">
                                    <div className="card-body">
                                    <Form
                                        onSubmit={this.onSubmit}
                                        initialValues={initialValues}
                                        render={({handleSubmit,submitSucceeded,pristine}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Field 
                                                            component={Select} 
                                                            name={`id_setor`} 
                                                            data={data}
                                                            label={`Setor:`}
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
                                                            description={`Atualizar`}
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosSetor,buscarDadosCategoriaId, alterarCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Editar);