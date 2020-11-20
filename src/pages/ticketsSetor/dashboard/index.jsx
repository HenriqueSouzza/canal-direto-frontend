import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import MenuHeader from '../../../components/menu/menuHeader';

import { FORM_RULES } from '../../../helpers/validations';

import Select from '../../../components/form/select';

import Button from '../../../components/form/button';

import { buscarDashboard, buscarStatusTicket } from './actions';

import { Bar, Pie } from 'react-chartjs-2';

import { Chart } from "react-google-charts";

import moment from 'moment';


class Index extends Component{

    componentDidMount(){
        const params = { ano: 2020 } 
        this.props.buscarDashboard(params)
        this.props.buscarStatusTicket()
    }

    onSubmit = values => {

        this.props.buscarDashboard(values)

    }

    render(){

        const { loading, dashboard, statusTicket } = this.props.ticketsSetor

        const { user } = this.props.auth

        let dataSelectSetorAtendimento = []

        if(user.categoriaAtendente && user.categoriaAtendente.length > 0){
            user.categoriaAtendente.map(row => dataSelectSetorAtendimento = row.setor.map(val => ({id: val.id, name: val.descricao})))
        }

        let dataSelectAno = [
            {id:2022, name:2022},
            {id:2021, name:2021},
            {id:2020, name:2020},
            {id:2019, name:2019},
            {id:2018, name:2018},
            {id:2017, name:2017},
            {id:2016, name:2016},
            {id:2015, name:2015},
            {id:2014, name:2014},
            {id:2013, name:2013},
            {id:2012, name:2012},
            {id:2011, name:2011},
            {id:2010, name:2010},
        ]

        let dataSelectMes = [
            {id:1, name:1},
            {id:2, name:2},
            {id:3, name:3},
            {id:4, name:4},
            {id:5, name:5},
            {id:6, name:6},
            {id:7, name:7},
            {id:8, name:8},
            {id:9, name:9},
            {id:10, name:10},
            {id:11, name:11},
            {id:12, name:12}
        ]

        let dataSelectDia = [
            {id:1, name:1},
            {id:2, name:2},
            {id:3, name:3},
            {id:4, name:4},
            {id:5, name:5},
            {id:6, name:6},
            {id:7, name:7},
            {id:8, name:8},
            {id:9, name:9},
            {id:10, name:10},
            {id:11, name:11},
            {id:12, name:12},
            {id:13, name:13},
            {id:14, name:14},
            {id:15, name:15},
            {id:16, name:16},
            {id:17, name:17},
            {id:18, name:18},
            {id:19, name:19},
            {id:20, name:20},
            {id:21, name:21},
            {id:22, name:22},
            {id:23, name:23},
            {id:24, name:24},
            {id:25, name:25},
            {id:26, name:26},
            {id:27, name:27},
            {id:28, name:28},
            {id:29, name:29},
            {id:30, name:30},
            {id:31, name:31},
        ]

        let dataIndicador = []
        let dataAbertosFechadosAnoMes = []
        let dataPolo = []
        let dataCategoria = []
        let dataUsuario = []

        if(dashboard.response){
            
            /********************* INDICADOR *******************/

            dataIndicador =[]

            /********************* TICKETS ABERTO FECHADO MES ANO *******************/

            if(dashboard.response.content.TicketAbertoFechadoMesAno){
                dataAbertosFechadosAnoMes.push(['Ano/Mes', 'Abertos', 'Fechados'])
                dashboard.response.content.TicketAbertoFechadoMesAno.map(row => dataAbertosFechadosAnoMes.push([row.ano + '/' + row.mes, row.aberto, row.fechado]))
            }

            /**************************  POLO *************************** */

            dataPolo =[]

            /*********************** CATEGORIA ********************** */

            if(dashboard.response.content.ticketCategoria){
                dataCategoria.push(['Categoria', 'Quantidade'])
                dashboard.response.content.ticketCategoria.map(row => dataCategoria.push([row.categoria, row.quantidade]))
            }
            
            /************************ USUARIO *************************/
            
            if(dashboard.response.content.ticketFechadosUsuario){
                dataUsuario.push(['Usuario', 'Quantidade Ticket por Fechado'])
                dashboard.response.content.ticketFechadosUsuario.map(row => dataUsuario.push([row.usuario, row.quantidade]))
            }
        }

        return(
            <section className="content">
                <MenuHeader title={`Tickets Para o Meu Setor`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card card-danger">
                        <div className="card-header">
                            <h3 className="card-title">Filtros</h3>
                        </div>
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                initialValues={{ano: 2020}}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row justify-content-center">
                                            <div className="col-md-2">
                                                <Field 
                                                    component={Select} 
                                                    name={`ano`} 
                                                    data={dataSelectAno}
                                                    label={`Ano:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <Field 
                                                    component={Select} 
                                                    name={`mes`} 
                                                    data={dataSelectMes}
                                                    label={`Mes:`}
                                                    />
                                            </div>
                                            <div className="col-md-2">
                                                <Field 
                                                    component={Select} 
                                                    name={`dia`} 
                                                    data={dataSelectDia}
                                                    label={`Dia:`}
                                                    />
                                            </div>
                                            <div className="col-md-6">
                                                <Field 
                                                    component={Select} 
                                                    name={`id_setor`} 
                                                    data={dataSelectSetorAtendimento}
                                                    label={`Setor:`}
                                                    />
                                            </div>
                                            <div className="col-md-3 text-center">
                                                <Field 
                                                    component={Button} 
                                                    type={`submit`}
                                                    name={`sendFilter`}
                                                    color={`btn-success`} 
                                                    description={`Filtrar`}
                                                    icon={`fa fa-filter`}
                                                    disabled={loading}
                                                    />
                                            </div>
                                        </div>
                                    </form>
                                )}/>
                        </div>
                    </div>

                    <div className="row">
                        {/* <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chamados por indicador</h3>
                                </div>
                                <div className="card-body">
                                </div>
                            </div>
                        </div> */}
                        {dataAbertosFechadosAnoMes.length > 0 ? 
                            <div className="col-md-6">
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <Chart
                                            chartType="Bar"
                                            data={dataAbertosFechadosAnoMes}
                                            options={{
                                            chart: {
                                                title: 'Chamados Abertos/Fechados por Ano / Mês',
                                            },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        : ''}
                        {/* <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chamados por Polo</h3>
                                </div>
                                <div className="card-body">
                                    <Pie 
                                        data={dataPolo} 
                                        />
                                </div>
                            </div>
                        </div> */}
                        {dataCategoria.length > 0 ? 
                            <div className="col-md-6">
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <Chart
                                            chartType="PieChart"
                                            data={dataCategoria}
                                            options={{
                                                title: 'Chamados por categoria',
                                                is3D: true,
                                            }}
                                            />
                                    </div>
                                </div>
                            </div>
                        : ''}
                        {dataUsuario.length > 0 ? 
                            <div className="col-md-6">
                                <div className="card card-primary">
                                    <div className="card-body">
                                        <Chart
                                            chartType="PieChart"
                                            data={dataUsuario}
                                            options={{
                                                title: 'Tickets Fechados por Usuário',
                                                is3D: true,
                                            }}
                                            />
                                    </div>
                                </div>
                            </div>
                        : ''}
                    </div>
                </div>
            </section>
        )

    }

}


/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ ticketsSetor: state.ticketsSetor, auth: state.auth})

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDashboard, buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);