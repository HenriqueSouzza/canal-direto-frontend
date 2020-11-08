import React from 'react';

import { Link } from 'react-router-dom';


function InformacoesDocente(props){

    const { data, onVoltar, onResponder, loading } = props

    const onClickVoltar = () => {
        onVoltar()
    }; 

    const onClickResponder = () => {
        onResponder()
    }; 

    return(
        <div className="card card-danger">
            <div className="card-header">
                <h5 className="card-title">Informações do Docente</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <label>Solicitante:</label>
                        <span className="ml-2">{data.usuario_abertura.num_func ? data.usuario_abertura.num_func + ' - ' + data.usuario_abertura.nome : '-'}</span>
                    </div>
                    <div className="col-md-4">
                        <label>E-mail:</label>
                        <span className="ml-2">{data.usuario_abertura.e_mail ? data.usuario_abertura.e_mail : '-'}</span>
                    </div>
                    <div className="col-md-4">
                        <label>Assunto:</label>
                        <span className="ml-2">{data.assunto ? data.assunto : '-'}</span>
                    </div>
                    <div className="col-md-4">
                        <label>Setor/Categoria:</label>
                        <span className="ml-2">{data.setor} - {data.categoria}</span>
                    </div>
                    <div className="col-md-8">
                        <label>Mensagem:</label>
                        <span className="ml-2">{data.setor} - {data.categoria}</span>
                    </div>
                    <div className="col-md-4">
                        <label>Anexos:</label>
                        <span className="ml-2">
                            {
                                data.arquivo && data.arquivo.length > 0 ?
                                    data.arquivo.map((row, index) => (
                                        <span className={`mr-3 mt-2`} key={index}>
                                            <a href={row} target="_blank" className={`btn btn-default`} download>
                                                <i className="fa fa-paperclip"></i> Anexo {index + 1}
                                            </a>
                                        </span>
                                    ))
                                :
                                    'Nenhum anexo'
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="card-footer card-default text-center">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <button
                            className={`btn btn-dark col-md-8`}
                            onClick={() => onClickVoltar()}>
                                <i className={`fa fa-arrow-left`}></i> Voltar
                        </button>
                    </div>
                    { onResponder ? 
                        <div className="col-md-4">
                            <button
                                className={`btn btn-primary col-md-8`}
                                onClick={() => onClickResponder()}
                                disabled={loading}>
                                    <i className={`fa fa-comment`}></i> Responder
                            </button>
                        </div>
                    : ''}
                </div>
            </div>
        </div> 
    )

}

export default InformacoesDocente;