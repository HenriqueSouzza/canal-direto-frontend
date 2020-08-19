import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../components/menu/menuHeader';

import LoadingBody from '../../components/loading/loadingBody';

import Input from '../../components/form/input';

import Checkbox from '../../components/form/checkbox';

import Button from '../../components/form/button';

import { FORM_RULES, composeValidators } from '../../helpers/validations';

import  { alterarSetor } from './actions'

import  { buscarDadosCategoria } from '../categoria/actions'

import DataTable from '../../components/table/dataTable';

import { Link } from 'react-router-dom';

class Editar extends Component{

    constructor(props) {
        super(props)

        if (props.setor.dadosSetor.length <= 0){
            props.history.goBack()
        } 
    } 

    componentDidMount(){
        //let userLogged = 'marcos.barroso'
        this.props.buscarDadosCategoria(this.props.match.params.id)
    }

    onSubmit = values => {
       
        values.ativo = (values.ativo ? "S" : "N");
        values.usuario = 'marcos.barroso';
        
        //console.log(values);

        this.props.alterarSetor(values, this.props.match.params.id)
    }

    render(){

        const initialValues = {}

        const {loading,dadosSetor} = this.props.setor

        if(dadosSetor.response){
            dadosSetor.response.content.find(element => {
                if(element.id == this.props.match.params.id){
                    initialValues.descricao = element.descricao
                    initialValues.ativo = (element.ativo == "S" ? true : false)
                }
             })
        }
        
        
        const {dadosCategoria} = this.props.categoria

        const columns = [
            {
                name: 'Categoria',
                selector: 'categoria',
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
                name: 'Ação',
                button: true,
                cell: row => <Link to={row.link} className={`nav-link text-info`}>
                                <i className={`fa fa-edit`}></i>
                            </Link>,
            }           
        ];    
        
        const dataCategoria = []

        
        if(dadosCategoria.response){
            dadosCategoria.response.content.map(row => {
                dataCategoria.push({
                    categoria: row.id,
                    descricao: row.descricao,
                    ativo: row.ativo,
                    link: "/categoria/"+row.id+"/editar"
                });

             })
        }        

       
        return(
                <>
                    <section className="content">
                        <LoadingBody status={false} />
                        <MenuHeader title={`Editar Setor`} history={this.props.location.pathname} />
                            <div className="content-fluid">
                                <div className="card">
                                    <div className="card-body">
                                    <Form
                                        onSubmit={this.onSubmit}
                                        initialValues={initialValues}
                                        render={({handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <Field 
                                                            component={Input} 
                                                            type={`text`}
                                                            name={`descricao`} 
                                                            label={`Descrição:`}
                                                            icon={`fa fa-id-badge`}
                                                            placeholder={`Descrição`}
                                                            validate={composeValidators(FORM_RULES.required)}
                                                            />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <Field 
                                                            component={Checkbox} 
                                                            type={`checkbox`}
                                                            name={`ativo`} 
                                                            label={`Ativo`}
                                                            />
                                                    </div>                                                                                                      
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="col-md-3">
                                                        {/* <label>&nbsp;</label> */}
                                                        <Field
                                                            component={Button}
                                                            name={`sendDados`}
                                                            type={`submit`} 
                                                            color={`btn-success`}
                                                            icon={`fa fa-sign-in`} 
                                                            description={`Editar`}
                                                            />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-dark"
                                                            onClick = {() => this.props.history.goBack()}
                                                            > Voltar 
                                                        </button>
                                                    </div>                                                    
                                                </div>                                                  
                                            </form>
                                        )}
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className="content-fluid">
                            <MenuHeader title={`Categorias`} history={this.props.location.pathname} />
                                <div className="card card-danger">
                                    <div className="card-body">
                                        <Link to={"/categoria/novo/"+this.props.match.params.id} className={`nav-link text-info`}>
                                            <button 
                                                type="button" 
                                                className="btn btn-success"
                                                > <i className={`fa fa-plus`}></i> Adicionar 
                                            </button>
                                            
                                        </Link>
                                        <DataTable
                                            description={false}
                                            checkbox={false} 
                                            columns={columns} 
                                            data={dataCategoria} 
                                            router={this.props.history}
                                            // btnAdd={true} 
                                            // actions={[ACTION_RULES.can_edit]}
                                            loading={this.props.categoria.loading} 
                                        />
                                    </div>
                                </div>
                            </div>                            
                    </section>
                </>
            )   
        }
} 

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ setor: state.setor, categoria: state.categoria })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ alterarSetor , buscarDadosCategoria }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Editar);