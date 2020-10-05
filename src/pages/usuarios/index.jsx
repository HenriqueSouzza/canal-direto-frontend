import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import MenuHeader from '../../components/menu/menuHeader';

import DataTable from '../../components/table/dataTable';

import { ACTION_RULES } from '../../helpers/authorization';

import  { buscarDadosUsuario } from './actions'

class Index extends Component{

    componentDidMount(){
        //let userLogged = 'marcos.barroso'
        this.props.buscarDadosUsuario()
    }

    render(){

        const {loading,dadosUsuario} = this.props.usuarios
        
        const dataUsuario = []

        if(dadosUsuario.response){
            if(Array.isArray(dadosUsuario.response.content)){
                dadosUsuario.response.content.map(row => {

                    dataUsuario.push({
                        codigo: row.id,
                        nome: row.name,
                        email: row.email,
                        campus: row.provider,
                        created_at: row.created_at,
                    })
                })
            }else{
                    dataUsuario.push({
                        codigo: dadosUsuario.response.content.id,
                        nome: dadosUsuario.response.content.name,
                        email: dadosUsuario.response.content.email,
                        campus: dadosUsuario.response.content.provider,
                        created_at: dadosUsuario.response.content.created_at,
                    });

            }

        }

        const columns = [
            {
                name: 'Codigo',
                selector: 'codigo',
                sortable: true,
            },
            {
                name: 'Nome',
                selector: 'nome',
                sortable: true,
            },{
                name: 'E-mail',
                selector: 'email',
                sortable: true,
            },{
                name: 'Campus',
                selector: 'campus',
                sortable: true,
            },{
                name: 'Criado',
                selector: 'created_at',
                sortable: true,
            }            
        ];        

       

        return(
            <section className="content">
                <MenuHeader title={`Usuários Cadastrados`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                         <div className="card-body">
                            <DataTable
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={dataUsuario} 
                                router={this.props.history}
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
const mapStateToProps = state => ({ usuarios: state.usuarios })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosUsuario }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);
