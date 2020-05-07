import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

class Historico extends Component{

    render(){
        return (
                <section className="content">
                    <MenuHeader title={`Informações do acampUnidos`} history={this.props.location.pathname} />
                    <div className="content-fluid">
                        <div className="card">
                            <div className="row justify-content-center">
                                dados informacoes
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


export default connect(null, null )(Historico);