import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import MenuHeader from '../../../components/menu/menuHeader';

class PassoTres extends Component{

    render(){
        return(
            <div className="text-left">
                <h4>Documento de inscrição</h4>
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