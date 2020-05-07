import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

import PassoUm from './passoUm';

import PassoDois from './passoDois';

import PassoTres from './passoTres';

class Acamp extends Component{

    constructor(props){
        super(props)

        this.state = {
            passoAtual: '1'
        }

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
        console.log(this.state)
        return (
                <section className="content">
                    <MenuHeader title={`Inscrição`} history={this.props.location.pathname} />
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header text-center">
                                    <div className={"d-inline p-2 mr-2 " + (this.state.passoAtual == '1' ? 'bg-primary' : 'bg-dark') + " rounded-circle text-white"}>
                                        Passo 1
                                    </div><i className="fa fa-arrow-right"></i>
                                    <div className={"d-inline p-2 mr-2 ml-2 " + (this.state.passoAtual == '2' ? 'bg-primary' : 'bg-dark') + " rounded-circle text-white"}>
                                        Passo 2
                                    </div><i className="fa fa-arrow-right"></i>
                                    <div className={"d-inline p-2 mr-2 ml-2 " + (this.state.passoAtual == '3' ? 'bg-primary' : 'bg-dark') + " rounded-circle text-white"}>
                                        Passo 3
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
// const mapStateToProps = state => ({ alunos: state.atvAlunos })

/**
 * @param {*} dispatch 
 */
// const mapDispatchToProps = dispatch => bindActionCreators({ removerAluno, buscarDadosForm, buscarAluno, alterarAluno, salvarAlunoLyceum }, dispatch);


export default connect(null, null )(Acamp);

