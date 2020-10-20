import React from 'react';

import { Link } from 'react-router-dom';

function InformacoesAluno(props){

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
                <h5 className="card-title">Informações do Aluno</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <label>Aluno / Solicitante:</label>
                        <div className="">{data.usuario_abertura.aluno ? data.usuario_abertura.aluno + ' - ' + data.usuario_abertura.nome : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Curso:</label>
                        <div className="">{data.usuario_abertura.curso ? data.usuario_abertura.curso + ' - ' + data.usuario_abertura.nome_curso : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Semestre:</label>
                        <div className="">{data.usuario_abertura.serie ? data.usuario_abertura.serie : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Turno:</label>
                        <div className="">{data.usuario_abertura.turno ? data.usuario_abertura.turno : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Tipo:</label>
                        <div className="">{data.usuario_abertura.tipo ? data.usuario_abertura.tipo + ' - ' + data.usuario_abertura.tipo_descricao : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Situação:</label>
                        <div className="">{data.usuario_abertura.sit_aluno ? data.usuario_abertura.sit_aluno : '-'}</div>
                    </div>
                    <br/>
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
                        <div className="">{data.setor} - {data.categoria}</div>
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

export default InformacoesAluno;