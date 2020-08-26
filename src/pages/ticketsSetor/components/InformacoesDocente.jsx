import React from 'react';


function InformacoesDocente(props){

    const { data } = props

    return(
        <div className="card card-danger">
            <div className="card-header">
                <h5 className="card-title">Informações do Docente</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <div className="">
                            <label>Solicitante:</label>
                            {data.usuario_abertura ? data.usuario_abertura : '-'}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label>Tipo Solicitante:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <br/>
                    <div className="col-md-12">
                        <label>Assunto:</label>
                        <div className="">{data.assunto ? data.assunto : '-'}</div>
                    </div>
                    <br/>
                    <div className="col-md-12">
                        <label>Setor/Categoria:</label>
                        <div className="">{data.setor} - {data.categoria}</div>
                    </div>
                    <div className="col-md-12">
                        <label>Mensagem:</label>
                        <div className="">{data.setor} - {data.categoria}</div>
                    </div>
                    <br/>
                </div>
            </div>
        </div> 
    )

}

export default InformacoesDocente;