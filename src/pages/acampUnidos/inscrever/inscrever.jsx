import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

import PassoUm from './passoUm';

import PassoDois from './passoDois';

import PassoTres from './passoTres';

import { USER } from '../../../config/const';

import { buscarDadosInscricao } from './actions';
import LoadingBody from '../../../components/loading/loadingBody';

class Inscrever extends Component{

    constructor(props){
        super(props)
        this.state = {
            passoAtual: '1'
        }
    }

    componentDidMount(){
        let dados = {
            'env': 'production',
            'idPessoa': USER.pessoa,
            'idEvento': '1'
        }
        this.props.buscarDadosInscricao(dados)
    }

    /**
     * 
     */
    onClickPasso = (params) => {
        this.setState(params)
    }

    /**
     * 
     */
    onPasso = () => {

        if(this.state.passoAtual == '1'){
            return <PassoUm onClickPasso={this.onClickPasso}/>
        }
        
        if(this.state.passoAtual == '2'){
            return <PassoDois onClickPasso={this.onClickPasso}/>
        }

        if(this.state.passoAtual == '3'){    
            return <PassoTres onClickPasso={this.onClickPasso}/>
        }

    }

    render(){

        //caso o usuario já tenha inscrição, pular para o passo 3
        let { loading, dadosInscricao } = this.props.acampUnidos
        
        let passo = dadosInscricao.inscricao && dadosInscricao.inscricao.length > 0 ? this.state.passoAtual = '3' : '1'
        
        return (
            <section className="content">
                <MenuHeader title={`Inscrição`} history={this.props.location.pathname} />
                <LoadingBody status={loading} />
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header text-center">
                                <div className={"d-inline p-2 mr-2 " + (passo == '1' ? 'bg-primary' : 'bg-dark') + " rounded-circle text-white"}>
                                    Dados cadastrais
                                </div><i className="fa fa-arrow-right"></i>
                                <div className={"d-inline p-2 mr-2 ml-2 " + (passo == '2' ? 'bg-primary' : 'bg-dark') + " rounded-circle text-white"}>
                                    Pagamento
                                </div><i className="fa fa-arrow-right"></i>
                                <div className={"d-inline p-2 ml-2 " + (passo == '3' ? 'bg-primary' : 'bg-dark') + " rounded-circle text-white"}>
                                    Comprovante
                                </div>
                            </div>
                            <div className="card-body text-center">
                                {this.onPasso()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ acampUnidos: state.acampUnidos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosInscricao }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Inscrever);

