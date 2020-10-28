import React from 'react';

import { Link } from 'react-router-dom';


function InformacoesFuncionario(props){

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
                <h5 className="card-title">Informações do Funcionário</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <label>Solicitante:</label>
                        <div className="">{data.usuario_abertura.nome ? data.usuario_abertura.nome : '-'}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Setor:</label>
                        <div className="">{data.usuario_abertura.setor ? data.usuario_abertura.setor : '-'}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Unidade Física:</label>
                        <div className="">{data.usuario_abertura.filial ? data.usuario_abertura.filial : '-'}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Email:</label>
                        <div className="">{data.usuario_abertura.email ? data.usuario_abertura.email : '-'}</div>
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
                                            <a href={row} target="_blank" className={`btn btn-default`} download>
                                                <i className="fa fa-paperclip"></i> Anexo {index + 1}
                                            </a>
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

export default InformacoesFuncionario;