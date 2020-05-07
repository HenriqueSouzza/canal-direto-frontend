import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

class PassoUm extends Component{

    render(){
        return(
            <div className="text-left">
                <h4>Dados Pessoais</h4>
                <button className="btn btn-success" onClick={() => this.props.onClickPasso({passoAtual: '2'})}>Proximo</button>
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


export default connect(null, null )(PassoUm);