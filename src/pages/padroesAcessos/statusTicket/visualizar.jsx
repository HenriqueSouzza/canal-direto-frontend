import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import MenuHeader from '../../../components/menu/menuHeader';

import LoadingBody from '../../../components/loading/loadingBody';

import { alterarStatusTicket, buscarStatusTicket } from './actions';


class Visualizar extends Component{

    componentDidMount(){
        this.props.buscarStatusTicket('?where[id]=' + this.props.match.params.id)
    }

    onSubmit = values => {
        this.props.alterarStatusTicket(values, this.props.match.params.id)
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    render(){

        const { loading, statusTicket } = this.props.padroesAcessos

        const initialValues = {}

        if(statusTicket.response){
            initialValues.nome = statusTicket.response.content[0].nome
            initialValues.descricao = statusTicket.response.content[0].descricao
            initialValues.ordem = statusTicket.response.content[0].ordem
        }

        return(
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Formulários de Tickets`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={initialValues}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="card card-danger">
                                    <div className="card-header">
                                        {/* <h3 className="card-title">Dados do Status</h3> */}
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`nome`} 
                                                    label={`Nome:`}
                                                    icon={`fa fa-file`}
                                                    placeholder={`Digite o nome do status`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`descricao`} 
                                                    label={`Descrição:`}
                                                    icon={`fa fa-align-justify`}
                                                    placeholder={`Digite para o que será utilizado`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                                <Field 
                                                    component={Input} 
                                                    type={`number`}
                                                    name={`ordem`} 
                                                    label={`Ordem:`}
                                                    icon={`fa fa-arrow-up`}
                                                    disabled={true}
                                                    placeholder={`Digite a ordem 1 ou 2 ou 3`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.number)}
                                                    />
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row justify-content-center">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Button} 
                                                    type={`button`}
                                                    onClick={() => this.onVoltar()}
                                                    color={`btn-dark`}
                                                    icon={`fa fa-arrow-left`}
                                                    description={`Voltar`}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    )}/>
                </div>
            </section>
        )
    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarStatusTicket, buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);
