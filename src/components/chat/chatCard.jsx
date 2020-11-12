import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, validateArchive, composeValidators } from '../../helpers/validations';

import Input from './input';

import Upload from './upload';

import Select from './select';

import Checkbox from '../form/checkbox';

import imgLogo  from '../../template/images/logo.png';

import imgUser  from '../../template/images/perfil.png';



function ChatCard(props){

    const { dataComment, 
            titleChat, 
            enableComment, 
            enableTypeReposta, 
            enableCategory, 
            dataCategoryAtt,
            addComment,
            enableAnexo, 
            enableCloseTicket
        } = props

    const [archivesSeleted, setArchivesSeleted] = useState({
                                                                file: [],
                                                                errorMessage: []
                                                            })

    //Deixar o scroll(barra) no fim da página  
    const messagesEndRef = useRef(null);
    
    //Deixar o scroll(barra) no fim da página e pegar os dados mais atualizados  
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [dataComment]);

    const onSubmit = (value, form) => {

        value.arquivo = archivesSeleted.file
        
        addComment(value)

        setTimeout(
            () => (
                    form.reset({mensagem: ''}),
                    form.resetFieldState('mensagem'),
                    setArchivesSeleted({file: [], errorMessage: []})
                ), 
            1000
        );
    }

    const onChangeFile = (file) => {

        const error = validateArchive(file)

        for(var i = 0; i < file.length; i++){
            archivesSeleted.file.push(file[i])
            archivesSeleted.errorMessage.push(error)
        }

        setArchivesSeleted({
            file: archivesSeleted.file,
            errorMessage: archivesSeleted.errorMessage
        })

    }

    /**
     * Remover um arquivo do chat
     * @param {*} value 
     */
    const removeArchive = index => {

        archivesSeleted.file.splice(index, 1)
        archivesSeleted.errorMessage.splice(index, 1)

        setArchivesSeleted({
            file: archivesSeleted.file,
            errorMessage: archivesSeleted.errorMessage
        })

    }

    const dataPublic = [
        {id: 'publico', name: 'Publico'},
        {id: 'privado', name: 'Privado'}
    ]

    const initialValues = {
        tipoResposta: 'publico'
    }

    return(
        <div className="card card-danger direct-chat direct-chat-secondary">
            <div className="card-header">
                <h3 className="card-title">{titleChat}</h3>
            </div>
            <div className="card-body">
                <div className="direct-chat-messages">
                    {dataComment.length > 0 ? 
                        dataComment.map((row, index) => {
                            if(row.solicitante){
                                return(
                                    <div key={index} className="direct-chat-msg right">
                                        <div className="direct-chat-infos clearfix">
                                            <span className="direct-chat-name float-right">{row.usuario_interacao}</span>
                                            <span className="direct-chat-timestamp float-left">{row.dt_criacao}</span>
                                        </div>
                                        <img className="direct-chat-img" src={imgUser} alt="iesb"/>
                                        <div className="direct-chat-text">
                                            {row.privado ? 'Mensagem interna: ' : ''}
                                            {row.mensagem}
                                            <br/>
                                            <br/>
                                            {
                                                row.arquivo.length > 0 ?
                                                    row.arquivo.map((val,key) => (
                                                        <span className={`mr-3 mt-2`} key={key + index}>
                                                            <Link to={{pathname: val}} target="_blank" className={`btn btn-default`} download>
                                                                <i className="fa fa-download"></i> Anexo {key + 1}
                                                            </Link>
                                                        </span>
                                                    ))
                                                : 
                                                    ''
                                            }
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div key={index} className="direct-chat-msg">
                                        <div className="direct-chat-infos clearfix">
                                            <span className="direct-chat-name float-left">{row.usuario_interacao}</span>
                                            <span className="direct-chat-timestamp float-right">{row.dt_criacao}</span>
                                        </div>
                                        <img className="direct-chat-img" src={imgLogo} alt="Atendente"/>
                                        <div className="direct-chat-text">
                                            {row.mensagem}
                                            <br/>
                                            <br/>
                                            {
                                                row.arquivo.length > 0 ?
                                                    row.arquivo.map((val,key) => (
                                                        <span className={`mr-3 mt-2`} key={key + index}>
                                                            <Link to={{pathname: val}} target="_blank" className={`btn btn-default`} download>
                                                                <i className="fa fa-download"></i> Anexo {key + 1}
                                                            </Link>
                                                        </span>
                                                    ))
                                                : 
                                                    ''
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        })
                    : 
                        <div className="text-center">
                            Sem {titleChat}
                        </div>
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {
                enableComment  ?
                    <div className="card-footer">
                        <Form
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                            render={({handleSubmit, submitting, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    {
                                        archivesSeleted.file.length > 0 ?
                                            archivesSeleted.file.map((value, index) => {
                                                return (
                                                    <span key={index} className="text-primary pointer" style={{cursor: 'pointer'}} onClick={() => removeArchive(index)}>
                                                        {value.name} <i className="fa fa-times"></i>
                                                        &nbsp;
                                                    </span> 
                                                )
                                            })
                                        : 
                                            ""   
                                    }
                                    <div className="row justify-content-center">
                                        <div className="input-group">
                                            <div className={enableTypeReposta && enableCloseTicket ? `col-md-12` : enableTypeReposta ? `col-md-6` : `col-md-9`}>
                                                <Field 
                                                    component={Input}
                                                    name="mensagem" 
                                                    validate={composeValidators(FORM_RULES.required)}
                                                    />
                                            </div>
                                            { enableTypeReposta && enableCloseTicket ? 
                                                <>
                                                    <br/>
                                                    <br/>
                                                </>
                                            : '' }
                                            {
                                                enableTypeReposta ?

                                                    <div className="col-md-3">
                                                        <Field 
                                                            component={Select}
                                                            data={dataPublic}
                                                            name="tipoResposta" 
                                                            />
                                                    </div>
                                                    
                                                : ''
                                            }
                                            {
                                                enableCloseTicket ?

                                                    <div className="col-md-2">
                                                        <Field 
                                                            component={Checkbox}
                                                            type={`checkbox`}
                                                            name={`fechar`}
                                                            label={`Fechar`} 
                                                            />
                                                    </div>
                                                    
                                                : ''
                                            }
                                            {
                                                enableCategory ?

                                                    <div className="col-md-3">
                                                        <Field 
                                                            component={Select}
                                                            data={dataCategoryAtt ? dataCategoryAtt : []}
                                                            name="categoryAtt" 
                                                            />
                                                    </div>
                                                    
                                                : ''
                                            }
                                            {
                                                enableAnexo ? 

                                                    <div className="col-md-1">
                                                        <Upload 
                                                            name={`arquivo`}
                                                            type={`file`}
                                                            onChange={onChangeFile}
                                                            multiple
                                                        />
                                                    </div>

                                                : ''
                                            }
                                            <div className="col-md-3">
                                                {/* <span className="input-group-append m-0"> */}
                                                    <button
                                                        type={`submit`}
                                                        className={`form-control btn btn-primary`}
                                                        disabled={submitting || pristine || archivesSeleted.errorMessage.find(row => row ? true : false)}>
                                                        <i className={`fa fa-paper-plane`}></i> Enviar 
                                                    </button>
                                                {/* </span> */}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                       archivesSeleted.errorMessage.length > 0 ?
                                            <div className="text-danger">
                                                {archivesSeleted.errorMessage.find(row => row ? row : false)}
                                            </div>
                                        :   
                                            ''
                                    }
                                </form>
                        )}/>
                    </div>
                : 
                    ""
            }
        </div>
    )
}

export default ChatCard;