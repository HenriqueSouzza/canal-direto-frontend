import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import Button from '../../../components/form/button';

import Input from '../../../components/form/input';

import Select from '../../../components/form/select';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import textArea from '../../../components/form/textArea';


class Visualizar extends Component{

    constructor(props){
        super(props)
        this.state = {
            onResponder: 0,
            onEncaminhar: 0
        }
    }

    onSubmit = values => {
        if(this.state.onResponder){
            console.log('responder')
        }else{
            console.log('encaminhar')
        }
    }

    onVoltar = () => {
        this.props.history.goBack()
    }

    onClickRespEnc = values => {
        if(values){
            this.setState({onResponder: 1, onEncaminhar: 0})
        }else{
            this.setState({onResponder: 0, onEncaminhar: 1})
        }
    }

    onResponder = () => {
 
        return(
            <div className="card">
                <div className="card-body">
                    <Form
                        onSubmit={this.onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <Field 
                                            component={textArea} 
                                            type={`text`}
                                            name={`mensagem`} 
                                            label={`Mensagem:`}
                                            rows={3}
                                            placeholder={`Escreva aqui...`}
                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(10),  FORM_RULES.max(300))}
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
                                            icon={`fa fa-save`} 
                                            description={`Responder`}
                                            />
                                    </div>
                                </div>
                            </form>
                        )}/>
                </div>
            </div>
        )

    }

    onEncaminhar = () => {

        let dataSetor = [{id: '1', name: 'teste'}]

        let dataCategoria = [{id: '1', name: 'teste'}]

        return(
            <div className="card">
                <div className="card-body">
                    <Form
                        onSubmit={this.onSubmit}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <Field 
                                            component={Select} 
                                            name={`setor`} 
                                            data={dataSetor}
                                            label={`Setor:`}
                                            validate={FORM_RULES.required}
                                            />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <Field 
                                            component={Select} 
                                            name={`categoria`} 
                                            data={dataCategoria}
                                            label={`Categoria:`}
                                            validate={FORM_RULES.required}
                                            />
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <Field 
                                            component={textArea} 
                                            type={`text`}
                                            name={`mensagem`} 
                                            label={`Mensagem:`}
                                            rows={3}
                                            placeholder={`Escreva algo aqui antes de enviar...`}
                                            validate={composeValidators(FORM_RULES.min(2),  FORM_RULES.max(300))}
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
                                            icon={`fa fa-save`} 
                                            description={`Encaminhar`}
                                            />
                                    </div>
                                </div>
                            </form>
                        )}/>
                </div>
            </div>
        )

    }

    render(){

        const { loading } = this.props.tickets

        return (
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Detalhe do ticket`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-header">
                            <h5 className="card-title">Informações</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Autor:</label>
                                    <div className="">123123123 - adasdasdasd</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Assunto:</label>
                                    <div className="">123123123 - adasdasdasd</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Setor/Categoria:</label>
                                    <div className="">123123123 - adasdasdasd</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Mensagem:</label>
                                    <div className="">asdadadsadasdadsdslkasjdflkçsadjfçlsdkjf</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row justify-content-center text-center">
                                <div className="col-md-3">
                                    <button type="button" className="btn btn-success" onClick={() => this.onClickRespEnc(1)}>
                                        <i className="fa fa-reply"></i> Responder
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" className="btn btn-primary" onClick={() => this.onClickRespEnc(0)}>
                                        <i className="fa fa-share"></i> Encaminhar
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" className="btn btn-dark" onClick={() => this.onVoltar()}>
                                        <i className="fa fa-arrow-left"></i> Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {   this.state.onResponder ? this.onResponder() : ''  }
                    {   this.state.onEncaminhar ? this.onEncaminhar() : '' }
                    <div className="card card-danger">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="card-title">Interações</h5>
                                </div>
                                <div className="col-md-6 text-right">
                                    <small className="badge badge-light">Encaminhado pelo $`USUARIO`</small>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Autor:</label>
                                    <div className="">123123123 - adasdasdasd</div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <label>Data da interação:</label>
                                    <div className="">testetestetestestes</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Anotação:</label>
                                    <div className="">asdadadsadasdadsdslkasjdflkçsadjfçlsdkjf</div>
                                </div>
                            </div>
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
const mapStateToProps = state => ({ tickets: state.tickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);