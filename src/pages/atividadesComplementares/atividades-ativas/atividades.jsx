import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import Table from '../../../components/table/dataTable';

import Select from '../../../components/form/select';

import Input from '../../../components/form/input';

import Checkbox from '../../../components/form/checkbox';

import Button from '../../../components/form/button';

import { ACTION_RULES } from '../../../helpers/authorization';

import { buscarAtividadesAtivas, buscarAtividadesSelect } from './actions';


class AtividadesAtivas extends Component{

    onSubmit = async (values) => {

        this.props.buscarAtividadesAtivas(values)

    }

    componentDidMount = () => {

        this.props.buscarAtividadesAtivas()
        this.props.buscarAtividadesSelect()

    }

    render(){

        const { list, listSelect, loading } = this.props.atividades

        const columns = [
            {
                name: 'Atividade',
                selector: 'SUB_ATIVIDADE',
                sortable: true,
            },
            {
                name: 'Nome Atividade',
                selector: 'DESCRICAO',
                sortable: true,
            },
            {
                name: 'Data Início',
                selector: 'DATA_INICIO',
                sortable: true,
            },
            {
                name: 'Data final',
                selector: 'DATA_FIM',
                sortable: true,
            },
            {
                name: 'Vagas',
                selector: 'VAGAS',
                sortable: true,
            },
            {
                name: 'Inscritos',
                selector: 'INSCRITOS',
                sortable: true,
            }
        ];

        let dataSelect = []
        
        if(listSelect.length > 0){
            listSelect.map(response => (
                dataSelect.push({
                    id: response.SUB_ATIVIDADE,
                    name: response.DESCRICAO
                })
            ))
        }

        return(
            <section className="content">
                <MenuHeader title={`Atividades ativas por período`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Select} 
                                                    name={`subatividade`} 
                                                    data={dataSelect}
                                                    label={`Escolha a atividade:`}
                                                    // validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    mask={`'mask': '99/99/9999'`}
                                                    name={`dataInicio`} 
                                                    label={`Data Início:`}
                                                    placeholder={`Data Início`}
                                                    icon={'far fa-calendar-alt'}
                                                    // validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Input} 
                                                    type={`date`}
                                                    mask={`'mask': '99/99/9999'`}
                                                    name={`dataFim`} 
                                                    label={`Data Fim:`}
                                                    placeholder={`Data Início`}
                                                    icon={'far fa-calendar-alt'}
                                                    // validate={FORM_RULES.required}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Field
                                                    component={Button}
                                                    type={`submit`}
                                                    icon={`fa fa-search`} 
                                                    color={`btn-success`}
                                                    description={`Buscar`}
                                                    />
                                            </div>
                                            <div className="col-md-3">
                                                <Field 
                                                    component={Checkbox} 
                                                    type={`checkbox`}
                                                    name={`ativo`} 
                                                    label={`Ativo`}
                                                    />
                                            </div>
                                        </div>
                                    </form>
                                )}  
                            />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <Table 
                                description={'Atividades Ativas'}
                                checkbox={false} 
                                columns={columns} 
                                data={list} 
                                router={this.props.history}
                                actionDelete={false}
                                btnAdd={false} 
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
const mapStateToProps = state => ({ atividades: state.atvAtividadesAtivas })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarAtividadesAtivas, buscarAtividadesSelect }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(AtividadesAtivas);