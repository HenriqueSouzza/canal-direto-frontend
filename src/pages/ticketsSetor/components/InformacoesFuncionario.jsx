import React from 'react';

import { Link } from 'react-router-dom';


function InformacoesFuncionario(props){

    const { data, onVoltar, onResponder, onFechar, loading } = props

    const onClickVoltar = () => {
        onVoltar()
    }; 

    const onClickResponder = () => {
        onResponder()
    }; 

    const onClickFechar = () => {
        onFechar()
    }; 

    return(
        <div className="card card-danger">
            <div className="card-header">
                <h5 className="card-title">Informações do Funcionário</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <label>Solicitante:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Assunto:</label>
                        <div className="">{data.assunto ? data.assunto : '-'}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Setor/Categoria:</label>
                        <div className="">{data.setor} - {data.categoria}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Mensagem:</label>
                        <div className="">{data.mensagem}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Anexos:</label>
                        <div className="">
                            {
                                data.arquivo && data.arquivo.length > 0 ?
                                    data.arquivo.map((row, index) => (
                                        <span className={`mr-3 mt-2`} key={index}>
                                            <Link to={{pathname: row}} target="_blank" className={`btn btn-default`} download>
                                                <i className="fa fa-paperclip"></i> Anexo {index + 1}
                                            </Link>
                                        </span>
                                    ))
                                :
                                    'Nenhum anexo'
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer card-default text-center">
                <div className="row">
                    <div className="col-md-4">
                        <button
                            className={`btn btn-dark col-md-6`}
                            onClick={() => onClickVoltar()}>
                                <i className={`fa fa-arrow-left`}></i> Voltar
                        </button>
                    </div>
                    { onResponder ? 
                        <div className="col-md-4">
                            <button
                                className={`btn btn-primary col-md-6`}
                                onClick={() => onClickResponder()}
                                disabled={loading}>
                                    <i className={`fa fa-comment`}></i> Responder
                            </button>
                        </div>
                    : ''}

                    { onFechar ? 
                        <div className="col-md-4">
                            <button
                                className={`btn btn-success col-md-6`}
                                onClick={() => onClickFechar()}
                                disabled={loading}>
                                    <i className={`fa fa-check`}></i> Fechar
                            </button>
                        </div>
                    : ''}
                </div>
            </div>
        </div>  
    )

}

export default InformacoesFuncionario;