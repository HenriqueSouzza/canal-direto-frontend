import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { ACTION_RULES } from '../../../helpers/authorization';

import { buscarMeusTickets } from '../actions'
 

class Index extends Component{

    componentDidMount(){
        let userLogged = 'henrique.souza'
        this.props.buscarMeusTickets(userLogged)
    }

    render(){

        const {loading, meusTickets } = this.props.tickets
        
        const dataTicket = []
        
        if(meusTickets.response){
            meusTickets.response.content.map(row => {
                dataTicket.push({
                    ticket: row.id,
                    assunto: row.assunto,
                    criado: row.created_at,
                    status: row.status,
                })
            })
        }

        const columns = [
            {
                name: 'Ticket',
                selector: 'ticket',
                sortable: true,
            },
            {
                name: 'Assunto',
                selector: 'assunto',
                sortable: true,
            },
            {
                name: 'Criado em',
                selector: 'criado',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            }
        ];
        

        return(
            <section className="content">
                <MenuHeader title={`Meus tickets`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        {/* <div className="card-header"> */}
                            {/* <h3 className="card-title">Meus tickets</h3> */}
                        {/* </div> */}
                        <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataTicket} 
                                router={this.props.history}
                                btnAdd={true} 
                                actions={[ACTION_RULES.can_detail]}
                                loading={loading} 
                            />
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
const mapStateToProps = state => ({ tickets: state.tickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarMeusTickets }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);