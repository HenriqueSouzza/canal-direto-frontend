import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

import { buscarAtividadesAtivas } from './actions';


class Visualizar extends Component {

    constructor(props){
        super(props)
        if(props.atividadeAtivas.list.length <= 0){
            props.history.goBack()
        }
    }

    render(){

        const { list } = this.props.atividadeAtivas;

        let dataItem = {}

        list.map(response => {
            if(response.SUB_ATIVIDADE == this.props.match.params.atividade){
                dataItem = response
            }
        })

        return(
            <section className="content">
                <MenuHeader title={`Visualizar`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card card-success card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Mais informações</h3>
                        </div>
                        <div className="card-body border">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="info-box bg-light">
                                        <div className="info-box-content">
                                            <span className="info-box-text text-center text-muted">Vagas</span>
                                            <span className="info-box-number text-center text-muted mb-0">{dataItem.VAGAS}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-box bg-light">
                                        <div className="info-box-content">
                                            <span className="info-box-text text-center text-muted">Inscritos</span>
                                            <span className="info-box-number text-center text-muted mb-0">{dataItem.INSCRITOS}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>Atividade:</h5>
                                    <p>{dataItem.ATIVIDADE}</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Data início:</h5>
                                    <p>{dataItem.DATA_INICIO}</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Data fim:</h5>
                                    <p>{dataItem.DATA_FIM}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>Curso:</h5>
                                    <p>{dataItem.CURSO} - {dataItem.NOME}</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Inscrição On-line:</h5>
                                    <p>{dataItem.AONLINE_INSCR}</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Integra BlackBoard:</h5>
                                    <p>{dataItem.BLACKBOARD}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>Docente:</h5>
                                    <p>{dataItem.DOCENTE}</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Local atividade:</h5>
                                    <p>{dataItem.LOCAL_ATIV}</p>
                                </div>
                                <div className="col-md-4">
                                    <h5>Instituição:</h5>
                                    <p>{dataItem.INSTITUICAO}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>Cursos Associados:</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <button className={`btn btn-danger`} onClick={() => this.props.history.goBack()}>
                                        <i className="fa fa-arrow-left"></i> Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

/**
 * 
 * @param {*} state 
 */
const mapStateToProps = state => ({ atividadeAtivas: state.atvAtividadesAtivas })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarAtividadesAtivas }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);