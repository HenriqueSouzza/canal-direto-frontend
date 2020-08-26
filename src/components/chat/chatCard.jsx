import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, validateArchive, composeValidators } from '../../helpers/validations';

import Input from './input';

import Upload from './upload';



function ChatCard(props){

    const {dataComment, titleChat, enableComment, addComment, enableAnexo} = props

    const [archivesSeleted, setArchivesSeleted] = useState({
                                                                file: [],
                                                                errorMessage: undefined
                                                            })

    const onSubmit = (value, form) => {

        value.arquivo = archivesSeleted.file
        if(!archivesSeleted.errorMessage){
            addComment(value)
        }

        setTimeout(
            () => (
                    form.reset({mensagem: ''}),
                    form.resetFieldState('mensagem'),
                    setArchivesSeleted({file: []})
                ), 
            1500
        );
    }

    const onChangeFile = (file) => {

        const error = validateArchive(file)

        for(var i = 0; i < file.length; i++){
            archivesSeleted.file.push(file[i])
        }

        setArchivesSeleted({
            file: archivesSeleted.file,
            errorMessage: error
        })

    }

    /**
     * Remover um arquivo do chat
     * @param {*} value 
     */
    const removeArchive = value => {
        const index = archivesSeleted.file.indexOf(value)

        archivesSeleted.file.splice(index, 1)

        setArchivesSeleted({file: archivesSeleted.file})

    }

    return(
        <div className="card card-danger direct-chat direct-chat-danger">
            <div className="card-header">
                <h3 className="card-title">{titleChat}</h3>
            </div>
            <div className="card-body">
                <div className="direct-chat-messages">
                    {dataComment.length > 0 ? 
                        dataComment.map((row, index) => {
                            if(row.solicitante){
                                return(
                                    <div key={index} className="direct-chat-msg">
                                        <div className="direct-chat-infos clearfix">
                                            <span className="direct-chat-name float-left">{row.usuario_interacao}</span>
                                            <span className="direct-chat-timestamp float-right">{row.dt_criacao}</span>
                                        </div>
                                        {/* <img className="direct-chat-img" src="" alt="atendente"/> */}
                                        <div className="direct-chat-text">
                                            {row.mensagem}
                                            <br/>
                                            {
                                                row.arquivo.length > 0 ?
                                                    row.arquivo.map((val,key) => (
                                                        <span className={`ml-3`} key={key + index}>
                                                            <Link to={{pathname: val}} target="_blank" download>
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
                                    <div key={index} className="direct-chat-msg right">
                                        <div className="direct-chat-infos clearfix">
                                            <span className="direct-chat-name float-right">{row.usuario_interacao}</span>
                                            <span className="direct-chat-timestamp float-left">{row.dt_criacao}</span>
                                        </div>
                                        {/* <img className="direct-chat-img" src="" alt="autor do usuario"/> */}
                                        <div className="direct-chat-text">
                                            {row.mensagem}
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
                </div>
            </div>
            {
                enableComment  ?
                    <div className="card-footer">
                        {console.log(archivesSeleted.file)}
                        <Form
                            onSubmit={onSubmit}
                            render={({handleSubmit, submitting, pristine}) => (
                                <form onSubmit={handleSubmit}>
                                    {
                                        archivesSeleted.file.length > 0 ?
                                            archivesSeleted.file.map((value,index) => {
                                                return (
                                                    <span key={index} className="text-primary pointer" style={{cursor: 'pointer'}} onClick={() => removeArchive(value)}>
                                                        {value.name} <i className="fa fa-times"></i>
                                                        &nbsp;
                                                    </span> 
                                                )
                                            })
                                        : 
                                            ""   
                                    }
                                    <div className="input-group">
                                        <Field 
                                            component={Input}
                                            name="mensagem" 
                                            validate={composeValidators(FORM_RULES.required)}>
                                        </Field>
                                        <span className="input-group-append m-0">
                                            {
                                                enableAnexo ? 

                                                    <Upload 
                                                        name={`arquivo`}
                                                        type={`file`}
                                                        onChange={onChangeFile}
                                                        multiple
                                                    />

                                                : 
                                                    ""
                                            }
                                        </span>
                                        <span className="input-group-append mb-2">
                                            <button
                                                type={`submit`}
                                                className={`btn btn-primary`}
                                                disabled={submitting || pristine}>
                                                <i className={`fa fa-paper-plane`}></i> Enviar 
                                            </button>
                                        </span>
                                    </div>
                                    <div className="text-danger">
                                        <span>{archivesSeleted.errorMessage}</span>
                                    </div>
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