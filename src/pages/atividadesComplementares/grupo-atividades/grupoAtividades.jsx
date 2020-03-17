import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import Table from '../../../components/table/dataTable';

import { ACTION_RULES } from '../../../helpers/authorization';

import MenuHeader from '../../../components/menu/menuHeader';

import { buscarGrupoAtividade, removerGrupoAtividade } from './actions';


class GrupoAtividades extends Component{


    componentDidMount(){
        this.props.buscarGrupoAtividade();
    }

    onDelete = (codigo) => {

        this.props.removerGrupoAtividade(codigo)
        
    }

    render(){

        const { loading, list } = this.props.grupoAtividade

        const columns = [
            {
                name: 'Código',
                selector: 'TIPO_ATIV_COMPL',
                sortable: true,
            },
            {
                name: 'Grupo',
                selector: 'GRUPO',
                sortable: true,
            },
            {
                name: 'Descrição',
                selector: 'DESCRICAO',
                sortable: true,
            }
        ];

        return(
            <section className="content">
                <MenuHeader title={`Grupos de Atividades`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Table 
                                description={false}
                                checkbox={false} 
                                columns={columns} 
                                data={list} 
                                router={this.props.history}
                                actionDelete={this.onDelete}
                                btnAdd={list.length > 0} 
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
const mapStateToProps = state => ({ grupoAtividade: state.atvGrupoAtividades })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarGrupoAtividade, removerGrupoAtividade }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(GrupoAtividades);