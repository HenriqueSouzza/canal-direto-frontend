import React from 'react';


function InformacoesFuncionario(props){

    const { data } = props


    const onClickVoltar = () => {

    }; 

    const onClickFechar = () => {

    }; 
 
    return(
        <div className="card card-danger">
            <div className="card-header">
                <h5 className="card-title">Informações do Funcionário</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <label>Solicitante:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                    <div className="col-md-4">
                        <label>Tipo Solicitante:</label>
                        <div className="">{data.usuario_abertura ? data.usuario_abertura : '-'}</div>
                    </div>
                </div>
                <div className="row">  
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
                        <div className="">{data.setor} - {data.categoria}</div>
                    </div>
                </div>
            </div>
            <div className="card-footer card-default text-center">
                <div className="row">
                    <div className="col-md-6">
                        <button
                            className={`btn btn-dark col-md-6`}
                            onClick={() => onClickVoltar()}>
                                <i className={`fa fa-arrow-left`}></i> Voltar
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            className={`btn btn-success col-md-6`}
                            onClick={() => onClickFechar()}>
                                <i className={`fa fa-check`}></i> Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    )

}

export default InformacoesFuncionario;