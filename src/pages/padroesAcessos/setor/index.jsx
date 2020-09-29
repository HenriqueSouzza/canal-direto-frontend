import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';

import MenuHeader from '../../../components/menu/menuHeader';

import DataTable from '../../../components/table/dataTable';

import { ACTION_RULES } from '../../../helpers/authorization';

import  { buscarSetor } from './actions';


class Index extends Component{

    componentDidMount(){
        this.props.buscarSetor()
    }

    render(){

        const { loading, setor } = this.props.padroesAcessos
        
        let dataSetor = []

        if(setor.response){
            dataSetor = setor.response.content.map(row => ({
                setor: row.id, 
                descricao: row.descricao, 
                ativo: row.ativo == '1' ? 'sim' : 'não',
                link: '/padroes-acessos/setor/' + row.id + '/visualizar'
            }))
        }

        const columns = [
            {
                name: 'Setor',
                selector: 'setor',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'descricao',
                sortable: true,
            },            
            {
                name: 'Ativo',
                selector: 'ativo',
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
                <MenuHeader title={`Setores Cadastrados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                         <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataSetor} 
                                router={this.props.history}
                                btnAdd={true} 
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
const mapStateToProps = state => ({ padroesAcessos: state.padroesAcessos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
