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

import Select from '../../components/form/select';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

class Cadastrar extends Component{

    onSubmit = values => {
        //console.log(values.ativo);

        var ativo = (values.ativo ? "S" : "N");
        var url = "http://sistemas-academicos-api.desenv.br/api/canal-direto/setor";

        // Requisições POST, note há um parâmetro extra indicando os parâmetros da requisição
        axios.post(url, { descricao: values.descricao, ativo: ativo, usuario: 'marcos.barroso'})
        .then(function(response){
            console.log('salvo com sucesso')
        });  
    }

    render(){

        const initialValues = {}

        var url = "http://sistemas-academicos-api.desenv.br/api/canal-direto/setor";
        let data = [];

        // Requisições do tipo GET
        axios.get(url)
        .then(function(response){

            let dados = response.data.response.content

            dados.map(row => {
                data.push({id: row.id, name:row.descricao})
            });

            console.log(response.status); 
        }); 

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
                                                    <div className="col-md-10">
                                                        <Field 
                                                            component={Select} 
                                                            name={`setor`} 
                                                            data={data}
                                                            label={`Setor:`}
                                                            validate={FORM_RULES.required}
                                                            />
                                                    </div>                                                    
                                                </div>                                            
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
const mapStateToProps = state => ({ setor: state.setor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Cadastrar);