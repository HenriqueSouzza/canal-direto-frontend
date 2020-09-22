import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

class Visualizar extends Component{

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


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);