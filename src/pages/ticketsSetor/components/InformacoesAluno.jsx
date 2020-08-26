import React from 'react';

function InformacoesAluno(props){

    const { data } = props

    return(
        <div className="card card-danger">
            <div className="card-header">
                <h5 className="card-title">Informações do Aluno</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <label>Aluno / Solicitante:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Nome Completo:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>CPF:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Curso:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Serie:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Campus:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
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
                        <label>Anexo:</label>
                        <div className="">{data.anexo} - {data.anexo}</div>
                    </div>
                </div>
            </div>
        </div> 
    )

}

export default InformacoesAluno;