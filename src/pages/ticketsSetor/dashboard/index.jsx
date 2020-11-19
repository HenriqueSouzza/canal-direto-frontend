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

import moment from 'moment';


class Index extends Component{

    componentDidMount(){
        // this.props.buscarDashboard()
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

        let dataAbertosFechadosAnoMes = {}

        if(dashboard.response){

            let data = {} 

            data.backgroundColor = []

            if(dashboard.response.content.TicketAbertoFechadoMesAno){
                data.anoMes = dashboard.response.content.TicketAbertoFechadoMesAno.map(row => row.ano + '/' + row.mes)
                data.aberto = dashboard.response.content.TicketAbertoFechadoMesAno.map(row => row.aberto)
                data.fechado = dashboard.response.content.TicketAbertoFechadoMesAno.map(row => row.fechado)

                let aberto = []
                let fechado = []
                for(let i = 1; i <= data.anoMes.length; i++){
                    aberto.push('rgba(255, 99, 132, 1)')
                    fechado.push('rgba(255, 99, 0, 1)')
                }

                data.backgroundColor.aberto = aberto
                data.backgroundColor.fechado = fechado
            }

            dataAbertosFechadosAnoMes = {
                labels: data.anoMes,
                datasets: [
                    {
                        label: `abertos`,
                        data: data.aberto,
                        backgroundColor: data.backgroundColor.aberto
                    },
                    {
                        label: `fechados`,
                        data: data.fechado,
                        backgroundColor: data.backgroundColor.fechado
                    },
                ]
            }
        }

        /********************* GRÁFICOS *******************/

        const dataIndicador = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '',
                data: [4, 8, 16, 32, 64, 128],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }

        

        const dataPolo = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Chamados Abertos/Fechados por Ano / Mês',
                data: [4, 8, 16, 32, 64, 128],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }

        const dataCategoria = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Chamados Abertos/Fechados por Ano / Mês',
                data: [4, 8, 16, 32, 64, 128],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }

        const dataUsuario = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '',
                data: [4, 8, 16, 32, 64, 128],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
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
                                                    name={`setor`} 
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
                        <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chamados por indicador</h3>
                                </div>
                                <div className="card-body">
                                    <Pie 
                                        data={dataIndicador} 
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chamados Abertos/Fechados por Ano / Mês</h3>
                                </div>
                                <div className="card-body">
                                    <Bar data={dataAbertosFechadosAnoMes} />
                                    {/* <Line data={data} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
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
                        </div>
                        <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chamados por Categoria</h3>
                                </div>
                                <div className="card-body">
                                    <Pie 
                                        data={dataCategoria} 
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Chamados por Usuário</h3>
                                </div>
                                <div className="card-body">
                                    <Pie 
                                        data={dataUsuario} 
                                        />
                                </div>
                            </div>
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
const mapStateToProps = state => ({ ticketsSetor: state.ticketsSetor, auth: state.auth})

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDashboard, buscarStatusTicket }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Index);