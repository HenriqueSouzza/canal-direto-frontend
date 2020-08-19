import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import MenuHeader from '../../components/menu/menuHeader';

import DataTable from '../../components/table/dataTable';

import { ACTION_RULES } from '../../helpers/authorization';

import  { buscarDadosSetor } from './actions'



class Index extends Component{

    componentDidMount(){
        //let userLogged = 'marcos.barroso'
        this.props.buscarDadosSetor()
    }

    render(){

        const {loading,dadosSetor} = this.props.setor
        
        const dataSetor = []

        console.log(dadosSetor)

        
        if(dadosSetor.response){
            if(Array.isArray(dadosSetor.response.content)){
                dadosSetor.response.content.map(row => {
                    console.log(row)
                    dataSetor.push({
                        setor: row.id,
                        descricao: row.descricao,
                        ativo: row.ativo,
                    })
                })
            }else{
                    dataSetor.push({
                        setor: dadosSetor.response.content.id,
                        descricao: dadosSetor.response.content.descricao,
                        ativo: dadosSetor.response.content.ativo,
                    });

            }

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
            }
        ];        

       

        return(
            <section className="content">
                <MenuHeader title={`Categorias Cadastradas`} history={this.props.location.pathname} />
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
                                data={dataSetor} 
                                router={this.props.history}
                                btnAdd={true} 
                                actions={[ACTION_RULES.can_edit]}
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
const mapStateToProps = state => ({ setor: state.setor })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosSetor }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
