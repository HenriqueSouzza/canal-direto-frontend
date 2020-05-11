import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { buscarDadosEvento } from './actions';

import LoadingBody from '../../../components/loading/loadingBody';

import { DirectPayment } from 'pagseguro-react';

class PassoDois extends Component{

    constructor(props){
        super(props)
         
        this.state = {
            
            session: '',

            env: 'sandbox',

            sender: {
                name: 'Willy Chagas',
                email: 'chagaswc89@gmail.com',
                phone: {
                    areaCode: '48',
                    number: '991510980',
                },
                document: {
                    type: 'CPF',
                    value: '71783955082'
                },
            },

            shipping: {
                type: 3,
                cost: 10.00,
                street: 'Av Campeche',
                number: 1111,
                complement: 'Casa',
                district: 'Campeche',
                city: 'Florianópolis',
                state: 'SC',
                country: 'BRA',
                postalCode: '88063789'
            },

            billing: {
                street: 'Av Campeche',
                number: 1111,
                complement: 'Casa',
                district: 'Campeche',
                city: 'Florianópolis',
                state: 'SC',
                country: 'BRA',
                postalCode: '88063789'
            },

            items: [
                {
                    id: 1,
                    description: 'Produto 1',
                    quantity: 2,
                    amount: 2,
                },  
                {
                    id: 2,
                    description: 'Produto 2',
                    quantity: 1,
                    amount: 60.00,
                },  
                {
                    id: 3,
                    description: 'Produto 3',
                    quantity: 2,
                    amount: 20.00,
                }

            ],

            creditCard: {
                maxInstallmentNoInterest: 5 // parcelas com desconto
            },
            extraAmount: 10.00,
            reference: 'Teste Pagseguro React'
        }

        if(props.dadosCadastrais.dadosUsuario.length <= 0){
            this.props.onClickPasso({passoAtual: '1'})
        }
    }

    onError = (values) => {
        console.log(values)
    }

    onSubmit = (values) => {
        console.log(values)
    }

    render(){

        let { loading, dadosUsuario } = this.props.dadosCadastrais

        let dadosComprador = {
            name: dadosUsuario ? dadosUsuario.nome_compl : '',
            email: dadosUsuario ? dadosUsuario.email : '',
            phone: {
                areaCode: '48',
                number: dadosUsuario ? dadosUsuario.telefone : '',
            },
            document: {
                type: 'CPF',
                value: dadosUsuario ? dadosUsuario.cpf : ''
            },
        }

        return(
            <div className="content-fluid">
                <LoadingBody status={loading} />
                <div className="text-left w-90">
                    <div className="bg-secondary rounded text-center">
                        <h4>Forma de pagamento</h4>
                    </div>
                    <div className="row justify-content-center mb-5 mt-5">
                        <DirectPayment 
                            env={this.state.env}
                            session={this.state.session}
                            extraAmount={this.state.extraAmount}                                       
                            reference={this.state.reference}
                            creditCard={this.state.creditCard}                                         
                            sender={this.state.sender}                                                
                            shipping={false}    
                            billing={false}                                               
                            items={this.state.items}                                                   	    
                            onError={this.onError.bind(this)}
                            onSubmit={this.onSubmit.bind(this)}     
                            />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <button className="btn btn-danger col-md-6" onClick={() => this.props.onClickPasso({passoAtual: '1'})}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ dadosCadastrais: state.dadosCadastrais })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosEvento }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(PassoDois);