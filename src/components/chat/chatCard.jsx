import React from 'react';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../helpers/validations';


function ChatCard(props){

    const {dataComment, titleChat, enableComment, addComment} = props
    
    const onSubmit = value => {
        addComment(value)
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
                enableComment ?
                    <div className="card-footer">
                        <Form
                            onSubmit={onSubmit}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <Field 
                                            name="message" 
                                            validate={composeValidators(FORM_RULES.required)}>
                                            {props => (
                                                <input
                                                    {...props.input}
                                                    type={`text`}
                                                    name={`message`}
                                                    placeholder={`Digite aqui...`}
                                                    className={`form-control ${props.meta.touched && props.meta.error && "is-invalid"}`}
                                                />
                                            )}
                                        </Field>
                                        <span className="input-group-append m-0">
                                            <label htmlFor="file-upload" className="btn btn-default">
                                                <i className="fa fa-paperclip"></i>
                                            </label>
                                            <input id="file-upload" name="arquivo" style={{display: 'none'}} type="file"/>
                                        </span>
                                        <span className="input-group-append mb-2">
                                            <button
                                                type={`submit`}
                                                className={`btn btn-primary`}>
                                                <i className={`fa fa-paper-plane`}></i> Enviar 
                                            </button>
                                        </span>
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