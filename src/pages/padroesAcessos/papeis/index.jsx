import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { buscarPapeis } from './actions';

class Index extends Component{

    componentDidMount(){
        this.props.buscarPapeis('?order=id,desc')
    }

    render(){

        const { loading, papeis } = this.props.padroesAcessos

        let dataPapeis = []

        if(papeis.response){
            dataPapeis = papeis.response.content.map(row => ({
                id: row.id,
                papel: row.papel,
                descricao: row.descricao,
                link: '/padroes-acessos/papeis/' + row.id + '/visualizar'
            }))
        }

        const columns = [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Papel',
                selector: 'papel',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'descricao',
                sortable: true,
            },
            {
                name: 'Detalhe',
                button: true,
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
                                <i className={`fa fa-eye`}></i>
                            </Link>,
            }   
        ];


        return(
            <section className="content">
                <MenuHeader title={`Papéis de usuários`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataPapeis} 
                                router={this.props.history}
                                actions={null}
                                loading={loading}
                                btnAdd 
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
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPapeis }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);