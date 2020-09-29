import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { buscarSetor } from './actions';

class SetorVisualizar extends Component{

    render(){
        return '1'
    }


}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(SetorVisualizar);