import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

class PassoTres extends Component{

    render(){
        return(
            <div className="text-left">
                <div className="bg-secondary rounded text-center">
                    <h4>Comprovante de inscrição</h4>
                </div>
                <button className="btn btn-danger" onClick={() => this.props.onClickPasso({passoAtual: '2'})}>Voltar</button>
            </div>
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


export default connect(null, null )(PassoTres);