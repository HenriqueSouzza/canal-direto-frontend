import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators, validateArchive } from '../../helpers/validations';

import Button from '../../components/form/button';

import Input from '../../components/form/input';

import Select from '../../components/form/select';

import UploadAnexo from '../../components/form/uploadAnexo';

import LoadingBody from '../../components/loading/loadingBody';

import MenuHeader from '../../components/menu/menuHeader';

import textArea from '../../components/form/textArea';

import { buscarSetor, buscarCategoria, salvarNovoTicket } from './actions';




class Novo extends Component{

    constructor(props){
        super(props)
        this.state = {
            arquivo: {
                file: [],
                errorMessage: []
            }
        }
    }

    //função que ao criar o component ele busca os setor que o usuario logado tem acesso
    componentDidMount(){
        this.props.buscarSetor()
    }

    onSubmit = values => {
        values.arquivos = this.state.arquivo.file
        values.status = 'aberto'
        
        this.props.salvarNovoTicket(values, this.props.history)
    }

    onChange = event => {
        if(event.target.name == 'setor' && event.target.value){
            this.props.buscarCategoria(event.target.value)
        }
    }

    //adiciona o arquivo selecionado
    onChangeFile = (file) => {

        const error = validateArchive(file)

        for(var i = 0; i < file.length; i++){
            this.state.arquivo.file.push(file[i])
            this.state.arquivo.errorMessage.push(error)
        }

        this.setState({
            file: this.state.arquivo.file,
            errorMessage: this.state.arquivo.errorMessage
        })

    }

    //Remove o arquivo selecionado
    onRemoveFile = (index) => {
        this.state.arquivo.file.splice(index, 1)
        this.state.arquivo.errorMessage.splice(index, 1)

        this.setState({ 
            file: this.state.arquivo.file, 
            errorMessage: this.state.arquivo.errorMessage
        })
    }

    render(){

        const { loading, dadosSetor, dadosCategoria } = this.props.meusTickets

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
                <MenuHeader title={`Abrir um Novo Ticket`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit} onChange={(e) => this.onChange(e)}>
                                        <div className="row justify-content-center">
                                            <div className="col-md-8">
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
                                                    {
                                                        this.state.arquivo.file.length > 0 ?
                                                            this.state.arquivo.file.map((value,index) => 
                                                                (
                                                                    <span key={index} className="text-primary pointer" style={{cursor: 'pointer'}} onClick={() => this.onRemoveFile(index)}>
                                                                        {value.name} <i className="fa fa-times"></i>
                                                                        &nbsp;
                                                                    </span> 
                                                                )
                                                            )
                                                        : 
                                                            ""   
                                                    }
                                                    <br/>
                                                <UploadAnexo 
                                                    name={`arquivo`}
                                                    type={`file`}
                                                    label={`Clique para anexar arquivo`}
                                                    className={`btn-info`}
                                                    onChange={this.onChangeFile}
                                                    multiple
                                                    />
                                                    {
                                                        this.state.arquivo.errorMessage.length > 0 ?
                                                            <div className="text-danger">
                                                                {this.state.arquivo.errorMessage.find(row => row ? row : false)}
                                                            </div>
                                                        :   
                                                            ''
                                                    }
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row justify-content-center">
                                            <div className="col-md-3">
                                                {/* <label>&nbsp;</label> */}
                                                <Field
                                                    component={Button}
                                                    name={`sendDados`}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    icon={`fa fa-save`} 
                                                    disabled={this.state.arquivo.errorMessage.find(row => row ? true : false)}
                                                    description={`Salvar`}
                                                    />
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
const mapStateToProps = state => ({ meusTickets: state.meusTickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarSetor, buscarCategoria, salvarNovoTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);