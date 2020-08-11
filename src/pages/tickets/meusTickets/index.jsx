import React, { Component } from 'react';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { ACTION_RULES } from '../../../helpers/authorization';


class Index extends Component{

    render(){

        let loading = false

        let dataTicket = [
            {ticket: '1', assunto: 'testando ticket', criado: '03-10-2020 13:00', status: 'Aguardando resposta'},
        ]

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
                <LoadingBody status={loading} />
                <MenuHeader title={`Meus tickets`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        {/* <div className="card-header">
                            <h3 className="card-title">asdas</h3>
                        </div> */}
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

export default Index;