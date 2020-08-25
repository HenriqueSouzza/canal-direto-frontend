import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import Button from '../../../components/form/button';

import Input from '../../../components/form/input';

import Upload from '../../../components/form/upload';

import Select from '../../../components/form/select';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import textArea from '../../../components/form/textArea';

import { buscarSetor, buscarCategoria, salvarNovoTicket } from '../actions';


class Novo extends Component{

    constructor(props){
        super(props)
        this.state = {
            arquivo: {
                file: [],
                errorMessage: ''
            }
        }
    }

    componentDidMount(){
        if(this.props.tickets.dadosSetor.length <= 0){
            this.props.buscarSetor()
        }
    }

    onSubmit = values => {
        values.arquivos = this.state.arquivo.file
        // values.papel_usuario = 1
        values.status = 'aberto'
        
        this.props.salvarNovoTicket(values, this.props.history)
    }

    onChange = event => {
        if(event.target.name == 'setor' && event.target.value){
            this.props.buscarCategoria(event.target.value)
        }
    }

    onVoltar = () => {
        this.props.history.goBack();
    }

    onChangeArchive = (file, action) => {

        if(action){
            
            this.state.arquivo.file.push(file)
            
        }else{

            const index =  this.state.arquivo.file.indexOf(file)

            console.log(this.state.arquivo.file.splice(index, 1))
            
        }

    }

    render(){

        const { loading, dadosSetor, dadosCategoria } = this.props.tickets

        let dataSetor = []

        if(dadosSetor.response){
            if(Array.isArray(dadosSetor.response.content)){
                dadosSetor.response.content.map(row => {
                    dataSetor.push({
                        id: row.id,
                        name: row.descricao,
                    })
                })
            }else{
                dataSetor.push({
                    id: dadosSetor.response.content.id,
                    name: dadosSetor.response.content.descricao,
                })
            }
        }
        
        let dataCategoria = []

        if(dadosCategoria.response){
            if(Array.isArray(dadosCategoria.response.content)){
                dadosCategoria.response.content.map(row => {
                    dataCategoria.push({
                        id: row.id,
                        name: row.descricao,
                    })
                })
            }else{
                dataCategoria.push({
                    id: dadosCategoria.response.content.id,
                    name: dadosCategoria.response.content.descricao,
                })
            }
        }

        return (
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Abrir um novo ticket`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit} onChange={(e) => this.onChange(e)} encType="multipart/form-data">
                                        <div className="row justify-content-center">
                                            <div className="col-md-7">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`assunto`} 
                                                    label={`Assunto:`}
                                                    icon={`fa fa-comment`}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                                <Field 
                                                    component={Select} 
                                                    name={`setor`} 
                                                    data={dataSetor}
                                                    label={`Setor:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                                <Field 
                                                    component={Select} 
                                                    name={`categoria`} 
                                                    data={dataCategoria}
                                                    label={`Categoria:`}
                                                    validate={FORM_RULES.required}
                                                    />
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
                                            <div className="col-md-5">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-10 mt-5 text-center">
                                                        <label>Anexar arquivo</label>
                                                        <Upload 
                                                            endpoint={`no-url`}
                                                            name={`arquivo`}
                                                            onChangeArchive={this.onChangeArchive}
                                                            />
                                                        {/* <Field 
                                                            component={Upload} 
                                                            endpoint={'no-url'} //
                                                            name={`arquivo`} 
                                                            validate={composeValidators(FORM_RULES.qtdArchiveMin(1))}
                                                            /> */}
                                                    </div>
                                                </div>
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
                                                    description={`Salvar`}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                {/* <label>&nbsp;</label> */}
                                                <button 
                                                    type={`button`}
                                                    className={`btn btn-dark col-md-12`}
                                                    onClick={this.onVoltar}>
                                                        <i className="fa fa-arrow-left"></i> Voltar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}/>
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
const mapDispatchToProps = dispatch => bindActionCreators({ buscarSetor, buscarCategoria, salvarNovoTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);