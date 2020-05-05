import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';


class Sair extends Component{

    componentDidMount(){
        sessionStorage.removeItem('token');
        this.props.history.push('/');
        this.props.history.go();
    }

    render(){
        return true 
    }

}

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);


export default connect(null, mapDispatchToProps )(Sair);