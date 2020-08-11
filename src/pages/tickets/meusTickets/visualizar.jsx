import React, { Component } from 'react';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';


class Visualizar extends Component{

    render(){

        return (
            <>
                Visualizar
            </>
        )

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ tickets: state.tickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Visualizar);