import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { efetuarLogout } from '../auth/actions';


class Sair extends Component{

    componentDidMount(){
        this.props.efetuarLogout(this.props.history)
    }

    render(){
        return true 
    }

}

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ efetuarLogout }, dispatch);


export default connect(null, mapDispatchToProps )(Sair);