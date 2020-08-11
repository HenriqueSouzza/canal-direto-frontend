import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';


class Visualizar extends Component{

    render(){

        return (
            <section className="content">
                <MenuHeader title={`Tickets do meu setor`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                    </div>
                </div>
            </section>  
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